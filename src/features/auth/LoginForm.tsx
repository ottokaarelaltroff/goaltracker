import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { GButton } from "../../components/GButton";
import { Input } from "../../components/Input";
import { WarningText } from "../../components/WarningText";
import { Colors } from "../../util/Colors";
import useAuth from "./useAuth";


type FormData = {
    email: string;
    password: string;
};

interface LoginFormProps {
    isRegister?: boolean
}

const LoginForm = ({ isRegister = false }: LoginFormProps) => {

    const { login, loginError, setLoginError, register } = useAuth();
    const [userName, setUserName] = useState<string | undefined>('ottokaarel');
    const [email, setEmail] = useState<string | undefined>('ottokaarel.altroff@gmail.com');
    const [password, setPassword] = useState<string | undefined>('S3cret123!');
    const [showPassword, setShowPassword] = useState<boolean | undefined>(false);

    const onLogin = () => {
        setLoginError(false)
        login.mutate({ email: email, password: password })
    };

    const onRegister = () => {
        setLoginError(false)
        register.mutate({ email: email, userName: userName, password: password })
    };

    const canLogin = email && email.length > 0 && password && password.length > 0;
    const canRegister = canLogin && userName && userName.length > 0;

    const onEmailChange = (value: string) => {
        setLoginError(false)
        setEmail(value)
    }

    const onPasswordChange = (value: string) => {
        setLoginError(false)
        setPassword(value)
    }

    const onUsernameChange = (value: string) => {
        setLoginError(false)
        setUserName(value)
    }

    return (
        <View style={styles.container}>
            <Input
                label={"E-mail"}
                placeHolder={"Enter your e-mail address"}
                initialValue={email}
                icon={require("../../assets/email.png")}
                onChange={onEmailChange} />
            {isRegister &&
                <Input
                    label={"Username"}
                    placeHolder={"Choose your Username"}
                    initialValue={userName}
                    icon={require("../../assets/user.png")}
                    onChange={onUsernameChange} />}
            <Input
                label={"Password"}
                isSecret={!showPassword}
                placeHolder={"Enter your password"}
                initialValue={password}
                icon={require("../../assets/password.png")}
                buttonIcon={require("../../assets/eye.png")}
                onChange={onPasswordChange}
                onPress={() => setShowPassword(!showPassword)} />
            {isRegister ?
                <GButton title={"Sign Up"} onPress={onRegister} borderColor={canRegister && Colors.lightBlue} disabled={!canRegister} /> :
                <GButton title={"Log In"} onPress={onLogin} borderColor={canLogin && Colors.green} disabled={!canLogin} />}
            {loginError && <WarningText>{"Login failed. Please check that your username and password are correct!"}</WarningText>}
            {/* <Collapsible isOpen={loginError}>
                <WarningText>{"Login failed. Please check that your username and password are correct!"}</WarningText>
            </Collapsible> */}
        </View>
    );
}

export default LoginForm;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
});