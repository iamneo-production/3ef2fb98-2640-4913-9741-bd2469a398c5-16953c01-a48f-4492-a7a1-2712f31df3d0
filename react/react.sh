cp /home/coder/project/workspace/react/setupTests.js /home/coder/project/workspace/reactapp/src/setupTests.js;
rm -f /home/coder/project/workspace/reactapp/src/tests/*;
cp /home/coder/project/workspace/react/tests/* /home/coder/project/workspace/reactapp/src/tests/;
cd /home/coder/project/workspace/reactapp/;
export CI=true;
npx react-scripts test --verbose --testPathPattern=src/tests 2>&1;