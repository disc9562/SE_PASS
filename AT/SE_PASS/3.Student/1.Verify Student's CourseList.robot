*** Setting ***
Library    Selenium2Library    implicit_wait=1s
Resource    ../Keywords.txt
Resource    ./Keywords.txt
Resource    ../1.Admin/Keywords.txt
Resource    ../2.Teacher/Keywords.txt
Suite Setup    Open Chrom Browser
Suite Teardown    Close Browser


*** Test Cases ***
Verify Student's CourseList
    Login As admin
    Create One Account    teacher    t1
    Create One Account    student    s1
    Create One Account    student    s2
    Create One Course    POSD    t1    星期三 17:00~18:00    60    POSD
    Choose Course    POSD    s1    s2
    Click CourseDetail And Verify It    POSD    s1    s2
    Logout
    
    Login As student
    User Course Should Contains    POSD    t1    星期三 17:00~18:00    60    POSD
    Logout
    
    Login As admin
    Delete All Account
    Delete All Class