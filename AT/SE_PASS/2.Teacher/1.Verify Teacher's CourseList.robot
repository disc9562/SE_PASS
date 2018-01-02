*** Setting ***
Library    Selenium2Library    implicit_wait=1s
Resource    ../Keywords.txt
Resource    ./Keywords.txt
Resource    ../1.Admin/Keywords.txt
Suite Setup    Run Keyword    Open Chrom Browser
Suite Teardown    Close Browser


*** Test Cases ***
Verify Teacher's CourseList
    Login As admin
    Create One Account    teacher    t1
    Create One Course    POSD    t1    星期三 17:00~18:00    60    POSD
    Logout
    Login As teacher
    User Course Should Contains    POSD    t1    星期三 17:00~18:00    60    POSD
    Logout
    Login As admin
    Delete All Account
    Delete All Class