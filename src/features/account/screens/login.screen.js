import { useState } from "react";
import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  AuthButton,
  AuthInput,
  Title,
  ErrorContainer,
} from "../components/account.styles";
import { TextInput } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import useAuth from "../../../utils/hooks/useAuth";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, error } = useAuth();

  return (
    <AccountBackground>
      <AccountCover />
      <Title>Meals To Go</Title>
      <AccountContainer>
        <Spacer size="large">
          <AuthInput
            label="Email"
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <AuthInput
            label="Password"
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            right={<TextInput.Icon icon="eye" />}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </Spacer>
        {error && (
          <ErrorContainer>
            <Text variant="error">{error}</Text>
          </ErrorContainer>
        )}
        <Spacer size="large">
          <AuthButton
            icon="lock-open-outline"
            mode="contained"
            onPress={() => onLogin(email, password)}
          >
            Login
          </AuthButton>
        </Spacer>
      </AccountContainer>
      <Spacer size="large">
        <AuthButton
          mode="contained"
          onPress={() => navigation.navigate("Main")}
        >
          Back
        </AuthButton>
      </Spacer>
    </AccountBackground>
  );
};
