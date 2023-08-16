
#!/bin/bash
if [ -d "/home/coder/project/workspace/angular-directive/" ]
then
    echo "project folder present"
    cp /home/coder/project/workspace/karma/karma.conf.js /home/coder/project/workspace/angular-directive/karma.conf.js;
    
    # checking for app component
    if [ -d "/home/coder/project/workspace/angular-directive/src/app" ]
    then
        cp /home/coder/project/workspace/karma/app.component.spec.ts /home/coder/project/workspace/angular-directive/src/app/app.component.spec.ts;
    else
        echo "test_case1 FAILED";
		echo "test_case2 FAILED";
		echo "test_case3 FAILED";

    fi

	cd /home/coder/project/workspace/angular-directive/;
    npm test;
else   
    echo "test_case1 FAILED";
    echo "test_case2 FAILED";
    echo "test_case3 FAILED";
fi