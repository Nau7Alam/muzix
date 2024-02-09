import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../../../Button/Button';
import Input from '../../../Input/Input';
import { useTheme } from '@react-navigation/native';
import { ITheme } from '../../../../theme/theme.interface';

type CreateRenameFormProps = {
  rename: boolean;
  field1: string;
  field2?: string;
  onChangeField1: (text: string) => void;
  onChangeField2?: (text: string) => void;
  onSubmit: () => void;
};
const CreateRenameForm = ({
  rename,
  field1,
  onChangeField1,
  field2,
  onChangeField2,
  onSubmit,
}: CreateRenameFormProps) => {
  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);

  return (
    <View style={styles.continer}>
      <Input type="primary" value={field1} onChange={onChangeField1} />
      {!!field2 && !!onChangeField2 ? (
        <Input type="primary" value={field2} onChange={onChangeField2} />
      ) : null}
      <Button
        title={rename ? 'Rename' : 'Create'}
        type="primary"
        onClick={onSubmit}
      />
    </View>
  );
};

const createStyle = (theme: ITheme) => {
  const { padding } = theme;
  return StyleSheet.create({
    continer: {
      gap: padding.lg,
    },
  });
};

export default CreateRenameForm;
