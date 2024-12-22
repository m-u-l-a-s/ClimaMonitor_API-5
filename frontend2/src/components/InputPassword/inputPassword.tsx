import React from 'react';
import {View, TextInput, TextInputProps, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {IconProps} from 'react-native-vector-icons/Icon';

interface InputPasswordProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
  IconRigth: React.ComponentType<IconProps>;
  IconRigthName: string;
  onIconRigthPress: () => void;
}

const InputPassword: React.FC<InputPasswordProps> = ({
  value,
  onChangeText,
  placeholder,
  placeholderTextColor = '#888',
  secureTextEntry = false,
  IconRigth,
  IconRigthName,
  onIconRigthPress,
  style,
  ...rest
}) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={secureTextEntry}
        {...rest}
      />
      <TouchableOpacity onPress={onIconRigthPress} style={styles.iconContainer}>
        <IconRigth name={IconRigthName} size={20} color="#888" />
      </TouchableOpacity>
    </View>
  );
};

export default InputPassword;
