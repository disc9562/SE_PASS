*** Setting ***
Library    Selenium2Library    implicit_wait=3s
Resource    ../Keywords.txt
Resource    ./Keywords.txt
Suite Setup    Open Browser And Login As admin
Suite Teardown    Close Browser



*** Test Cases ***
It Should Shown Correctly Account
    Create One account Account And Verify It    teacher    teacher1
    Create One account Account And Verify It    teacher    teacher2
    Create One account Account And Verify It    student    student1
    Create One account Account And Verify It    student    student2
