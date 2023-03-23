import { useForm, Controller } from "react-hook-form";
import { Button, Dimensions, Text, TextInput, View } from "react-native";
import { Colors } from "../util/Colors";
import useLogin from "./useLogin";


type FormData = {
    email: string;
    password: string;
};

const { width } = Dimensions.get("window");

const LoginForm = () => {
    const { login } = useLogin();

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            email: 'ottokaarel.altroff@gmail.com',
            password: 'S3cret123!'
        }
    });
    const onSubmit = (data) => {
        login.mutate({ email: data.email, password: data.password })
    };

    return (
        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={{ width: width, height: 35, backgroundColor: Colors.light, marginBottom: 15 }}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="email"
            />
            {errors.email && <Text>This is required.</Text>}

            <Controller
                control={control}
                rules={{
                    required: true,
                    maxLength: 100,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={{ width: width, height: 35, backgroundColor: Colors.light }}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="password"
            />

            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
    );
}

export default LoginForm;