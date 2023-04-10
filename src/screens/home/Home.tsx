import React, {ReactNode, useCallback, useEffect, useState} from 'react';
import {Alert, SafeAreaView, StyleSheet} from 'react-native';
import Container from '@components/Container';
import {colors} from '@theme/colors';
import {hp} from '@utils/responsive-dimension';
import {useDispatch, useSelector} from 'react-redux';
import Header from '@components/Header';
import updateStatusBar from '@hooks/updateStatusBar';
import {persistor, RootState} from '@redux/store';
import TopTabs from '@components/TopTabs';
import TaskList from './components/TaskList';
import BottomTab from '@components/BottomTab';
import DateModal from '@components/DateModal';
import CreateTaskModal from '@components/CreateTaskModal';
// import moment from 'moment';
import {setTaskList, toDoList as toDoListT} from '@redux/tasks/tasksSlice';
import uuid from 'react-native-uuid';

const Home = () => {
  const [showDateModal, setShowDateModal] = useState(false);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [tabIndex, setTabIndex] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [taskCreation, setTaskCreation] = useState(false);
  const [taskTitle, setTaskTitle] = useState<string | null>(null);
  const [taskDescription, setTaskDescription] = useState<string | null>(null);

  const [tabRoutes, setTabRoutes] = useState<toDoListT[]>([]);
  const [tabComponents, setTabComponents] = useState<
    {key: string; component: ReactNode; func: () => void}[]
  >([]);
  const [activeTabName, setActiveTabName] = useState<string>('My Tasks');
  // const [tabList, setTabList] = useState<toDoList[]>([]);

  updateStatusBar('light-content', colors?.mainBg, false);

  const dispatch = useDispatch();
  const {toDoList, taskList} = useSelector((state: RootState) => state?.tasks);

  useEffect(() => {
    if (toDoList) {
      setTabRoutes(toDoList);
      let newToDoList = toDoList.map(obj => ({
        key: obj.key,
        component: <TaskList listName={obj?.title!} />,
        func: () => {},
      }));
      setTabComponents(newToDoList);
      // console.log(tabList);
    }
  }, [toDoList]);

  useEffect(() => {
    setActiveTabName(toDoList[tabIndex].title);
  }, [toDoList, tabIndex]);

  const getIndex = (index: number) => {
    setTabIndex(index);
  };

  const resetTaskCreation = () => {
    setTaskTitle(null);
    setTaskDescription(null);
    setSelectedDate(null);
  };

  const onBackDropPress = () => {
    if (taskTitle) {
      handleCancelTaskCreation();
      return;
    }
    setTaskCreation(false);
    setShowCreateTaskModal(false);
    resetTaskCreation();
  };

  const handleCancelTaskCreation = () => {
    Alert.alert(
      'Discard current task?',
      'Are you sure that you want to discard the current draft?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
        },
        {
          text: 'Discard',
          onPress: () => {
            setShowCreateTaskModal(false);
            setTaskCreation(false);
            resetTaskCreation();
          },
          // style: 'cancel',
        },
      ],
    );
  };

  const onPressSave = useCallback(
    (stared: boolean) => {
      try {
        let taskData = {
          id: uuid.v4(),
          taskTitle,
          taskDescription,
          selectedDate,
          stared,
        };

        console.log('activeTabName => ', activeTabName);
        console.log('taskList => ', taskList);
        console.log('taskList[activeTabName] => ', taskList[activeTabName]);

        let newTaskList = {
          [activeTabName]: {
            ...taskList[activeTabName],
            ongoingTasks: [taskData, ...taskList[activeTabName]?.ongoingTasks],
          },
        };

        if (stared) {
          let newStaredList = {
            Stared: {
              ...taskList?.Stared,
              ongoingTasks: [taskData, ...taskList.Stared?.ongoingTasks],
            },
          };
          dispatch(setTaskList(newStaredList));
        }

        dispatch(setTaskList(newTaskList));
        setShowCreateTaskModal(false);
        setTaskCreation(false);
        resetTaskCreation();
        // console.log(taskData);
      } catch (error) {
        console.log(error);
      }
    },
    [activeTabName, taskList, taskTitle, taskDescription, selectedDate],
  );

  return (
    <SafeAreaView style={styles.main}>
      <Header title={'Tasks'} />
      <Container
        flex={1}
        marginHorizontal={0}
        customStyles={{
          paddingTop: hp(24),
          paddingBottom: hp(48),
        }}>
        <TopTabs
          getIndex={getIndex}
          currentIndex={tabIndex}
          style={{zIndex: -1}}
          tabRoutes={tabRoutes}
          tabComponents={tabComponents}
        />
      </Container>
      <BottomTab
        onPressAdd={() => {
          setShowCreateTaskModal(true);
          setTaskCreation(true);
        }}
      />
      <DateModal
        isVisible={showDateModal}
        onModalHide={() => setShowCreateTaskModal(true)}
        closeModal={() => setShowDateModal(false)}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <CreateTaskModal
        isVisible={showCreateTaskModal}
        onModalHide={() => {
          console.log(taskCreation);
          if (taskCreation) setShowDateModal(true);
        }}
        closeModal={() => setShowCreateTaskModal(false)}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        onBackdropPress={onBackDropPress}
        onPressSave={onPressSave}
        taskTitle={taskTitle}
        taskDescription={taskDescription}
        setTaskTitle={setTaskTitle}
        setTaskDescription={setTaskDescription}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.mainBg,
  },
});

export default Home;
