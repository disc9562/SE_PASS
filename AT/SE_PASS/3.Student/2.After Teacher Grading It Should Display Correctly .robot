*** Setting ***
Library    Selenium2Library    implicit_wait=1s
Resource    ../Keywords.txt
Resource    ./Keywords.txt
Resource    ../Admin/Keywords.txt
Resource    ../Teacher/Keywords.txt
Suite Setup    Open Chrom Browser
Suite Teardown    Close Browser


*** Test Cases ***
After Teacher Grading It Should Display Correctly 
    Login As admin
    Create One Account   teacher    t1
    Create One Account   student    s1
    Create One Account   student    s2
    Create One Course    POSD    t1    星期三 17:00~18:00    60    POSD
    Choose Course    POSD    s1    s2
    Logout
    Login As teacher
    User Course Should Contains    POSD    t1    星期三 17:00~18:00    60    POSD
    User Enter The POSD
    Add An Assignment    hw1    POSD-hw1
    Grading One Student    hw1    s1    100    Good
    Logout
    
    Login As student
    User Course Should Contains    POSD    t1    星期三 17:00~18:00    60    POSD
    User Enter The POSD
    Assignment Should Be Graded    hw1    100    Good
    Logout
    
    Login As teacher
    User Enter The POSD
    Delete All Assignment
    Logout
    Login As admin
    Delete All Account
    Delete All Class

*** Keywords ***
Assignment Should Be Graded
    [Arguments]    @{gradeDetails}
    Wait Until Element Is Visible     xpath://tr//*[contains(text(),'作業名稱')]    
    :FOR    ${gradeDetail}    IN    @{gradeDetails}
    \    Page Should Contain Element    xpath://tr//*[contains(text(),'${gradeDetail}')]       
    