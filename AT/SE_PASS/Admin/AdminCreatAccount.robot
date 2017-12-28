*** Setting ***
Library    Selenium2Library    implicit_wait=3s
Resource    ../Keywords.txt
Resource    ./Keywords.txt
Suite Setup    Open Browser And Login As admin
# Suite Teardown    Close Browser



*** Test Cases ***
It Should Shown Correctly Account
    # Create One teacher Account And Verify It
    Create One student Account And Verify It