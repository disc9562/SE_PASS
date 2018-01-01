*** Setting ***
Library    Selenium2Library    implicit_wait=3s
Resource    ../Keywords.txt
Resource    Keywords.txt
Suite Setup    Open Browser And Login As admin
Suite Teardown    Close Browser

*** Test Cases ***
AdminAddStrudentToCourse
    Create One account Account And Verify It    teacher    t1
    Create One account Account And Verify It    student    s1
    Create One account Account And Verify It    student    s2
    Create One Course And Verify It    POSD    t1    星期三 17:00~18:00    60    POSD
    Choose Course    POSD    s1    s2
    Delete All Account
    Delete All Class