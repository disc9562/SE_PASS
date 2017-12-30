*** Setting ***
Library    Selenium2Library    implicit_wait=1s
Resource    ../Keywords.txt
Resource    ./Keywords.txt
Suite Setup    Open Browser And Login As teacher
# Suite Teardown    Close Browser

*** Test Cases ***
Verify User Upload File 
    User Enter The MyClass
    Wait Until Element Is Visible    xpath://tr/td[contains(text(), 'HW1')]
    Choose File    xpath://tr/td[contains(text(), 'HW1')]    file_path
    # Choose File	my_upload_field	${CURDIR}/trades.csv