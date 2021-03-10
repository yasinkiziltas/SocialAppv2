import styled from 'styled-components'

export const InputWrapper = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #2e64e515;
`

export const InputField = styled.TextInput`
    justify-content: center;
    align-items: center;
    font-size: 24px;
    text-align: center;
    width: 90%
`


export const AddImage = styled.Image`
    width: 100%;
    height: 300px;
    margin-bottom: 5px;
`;

export const StatusWrapper = styled.View`
    justify-content: center;
    align-items: center;
    margin-top:10px;
    margin-bottom:10px;
`;

export const SubmitButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    background-color: #2e64e515;
    border-radius: 5px;
    padding: 10px 25px;
`;

export const SubmitButtonText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #2e64e5;
`;