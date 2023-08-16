
const unsigned int maxRecords = 1000;

unsigned int get_line_count(std::string filename)
{
	std::string command = "wc -l " + filename;
	FILE* pipe = popen(command.c_str(), "r");
	if (!pipe) return 0;
	char buffer[128];
	std::string result = "";
	while(!feof(pipe)) {
		if(fgets(buffer, 128, pipe) != NULL)
			result += buffer;
	}
	pclose(pipe);

	std::string parsed = result.substr(0, result.find(' '));
	return atoi(parsed.c_str());
}


void get_available_files(deque<std::string> *avail)
{
        /*
           Log files are stored as /var/log/mydir/mylog.log
           Rotated files are timestamped - mylog.log.ts1, mylog.log.ts2 etc.
        */
	std::string command = "ls -t mylog.log*"; //sort by time
	FILE* pipe = popen(command.c_str(), "r");
	if (!pipe) return;
	char buffer[512];
	std::string result = "";
	while(!feof(pipe)) {
		if(fgets(buffer, 512, pipe) != NULL)
			result += buffer;
	}
	pclose(pipe);

	stringstream ss;
	std::string onefile;
	ss << result;
	while (ss >> onefile)
		avail->push_back(onefile);
}

void print_contents(deque<std::string> *ptr)
{
	for(int i=0; i<ptr->size(); ++i)
	{
		std::string f = ptr->at(i);
		int lineCount = get_line_count(f);
		cout<<"Cur file = "<< f <<" (No of lines = " << lineCount << ")" << endl;
	}
}

unsigned int determine_files_to_read(deque<std::string> *avail, deque<std::string> *toRead)
{
	unsigned int cumLineCount = 0;
	unsigned int startLineNo = 0; //on first file in 'toread' list

	while(!avail->empty())
	{
		std::string f = avail->front();
		int lineCount = get_line_count(f);
		avail->pop_front();
		toRead->push_front(f); //add to front of list
		//cout<<"adding " << f << " toread"<<endl;

		cumLineCount += lineCount;

		if(cumLineCount >= maxRecords) {
			//if cumLineCount remains < maxRecords, startLine on first file will be 0.
			unsigned int linesInThisFile = maxRecords - (cumLineCount - lineCount);
			startLineNo = lineCount - linesInThisFile;
			break;
		}
	}
	return startLineNo;
}

main()
{
  ...
  unsigned int startLineNo = 0;
  deque<std::string> availableFiles, filesToRead;
  string sLine = "";
  std::ifstream infile;

  get_available_files(&availableFiles);
  startLineNo = determine_files_to_read(&availableFiles, &filesToRead);

  bool firstFile = true;

    while(!filesToRead.empty())
	{
    	std::string file = filesToRead.front();

    	infile.open(file.c_str());
    	if(!infile.is_open()) {
    		cout<<"Unable to open file " << file << endl;
    		filesToRead.pop_front(); // pop front and continue with next file
    		continue;
    	}

    	if(firstFile)
    	{
    		firstFile = false;
			unsigned int tmpcounter = 0;
                        //skip the lines from first file.
			while(!infile.eof())
			{
				getline(infile, sLine);
				++tmpcounter;
				if(tmpcounter >= startLineNo)
					break;
			}
    	}

		//start printing from this line.
    	while(!infile.eof())
		{
			getline(infile, sLine);
			cout<< sLine << endl;
		}

		infile.close();
		filesToRead.pop_front();//continue with next file
	}
}