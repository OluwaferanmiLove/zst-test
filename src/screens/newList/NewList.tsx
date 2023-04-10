/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '@theme/colors';
import {hp, wp} from '@utils/responsive-dimension';
import {useDispatch} from 'react-redux';
import Header from '@components/Header';
import updateStatusBar from '@hooks/updateStatusBar';
import Input from '@components/Input';
import {setTaskList, setTodoList, toDoList} from '@redux/tasks/tasksSlice';
import Row from '@components/Row';
import {Ionicons} from '@expo/vector-icons';
import CustomText from '@components/CustomText';
import {useNavigation} from '@react-navigation/native';

const NewList = () => {
  const [listTitle, setListTitle] = useState<string>('');
  // const [autoFocus, setAutoFocus] = useState<boolean>(false);
  updateStatusBar('light-content', colors?.mainBg, false);
  const inputRef = useRef<TextInput>(null);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  // const {token} = useSelector((state: RootState) => state?.auth);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
  }, []);

  const onPressSave = () => {
    if (listTitle!?.length < 1) {
      return;
    }
    let list: toDoList = {
      key: listTitle!,
      title: listTitle!,
    };

    dispatch(setTodoList(list));
    dispatch(
      setTaskList({[listTitle]: {ongoingTasks: [], completedTasks: []}}),
    );
    navigation.goBack();
  };

  const Back = () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Row>
        <Ionicons name={'chevron-back'} color={colors?.primary} size={wp(28)} />
        <CustomText.BodySmall color={colors?.primary} marginLeft={wp(8)}>
          Back
        </CustomText.BodySmall>
      </Row>
    </TouchableOpacity>
  );

  const Done = () => (
    <TouchableOpacity
      onPress={onPressSave}
      disabled={listTitle!?.length < 1 ? true : false}>
      <CustomText.BodySmall
        color={listTitle!?.length < 1 ? colors?.secondary : colors?.primary}
        marginLeft={wp(8)}>
        Done
      </CustomText.BodySmall>
    </TouchableOpacity>
  );

  return (
    <View style={styles.top}>
      <SafeAreaView style={styles.main}>
        <Header
          leftElement={<Back />}
          onPressLeftElement={() => navigation.goBack()}
          rightElement={<Done />}
          title={'Create new list'}
        />
        <Input
          reff={inputRef}
          value={listTitle!}
          placeholder={'Enter list title'}
          placeholderTextColor={'#81848A'}
          inputContainerStyles={styles.inputContainerStyles}
          // autoFocus
          onChangeText={text => setListTitle(text)}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    flex: 1,
    backgroundColor: '#2E2E31',
  },
  main: {
    // flex: 1,
    backgroundColor: colors.mainBg,
  },
  inputContainerStyles: {
    paddingHorizontal: wp(16),
    paddingTop: hp(24),
    paddingBottom: hp(16),
  },
});

export default NewList;
