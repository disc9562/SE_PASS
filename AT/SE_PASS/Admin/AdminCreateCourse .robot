*** Setting ***
Library    Selenium2Library    implicit_wait=3s
Resource    ../Keywords.txt
Resource    Keywords.txt
Suite Setup    Open Browser And Login As admin
Suite Teardown    Close Browser

*** Test Cases ***
It Should Shown Correctly Course
    Create One account Account And Verify It    teacher    teacher1
    Create One Course And Verify It    SE    teacher1    星期三 17:00~18:00    60    SE
    Create One Course And Verify It    ALSD    teacher1    星期三 17:00~18:00    60    ALSD