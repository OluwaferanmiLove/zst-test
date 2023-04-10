/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {
  Image,
  LayoutAnimation,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {hp, wp} from '@utils/responsive-dimension';
import {useDispatch, useSelector} from 'react-redux';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import TaskCard from '@components/TaskCard';
import CustomText from '@components/CustomText';
import {colors} from '@theme/colors';
import {RootState} from '@redux/store';
import {setTaskList, task} from '@redux/tasks/tasksSlice';
import Row from '@components/Row';
import {Ionicons} from '@expo/vector-icons';

const TaskList = ({listName}: {listName: string}) => {
  const [tasksData, setTasksData] = useState<task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<task[]>([]);
  const [collapse, setCollapase] = useState(false);

  const {taskList} = useSelector((state: RootState) => state?.tasks);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (taskList[listName]?.ongoingTasks) {
      setTasksData(taskList[listName]?.ongoingTasks);
    }

    if (taskList[listName]?.completedTasks) {
      setCompletedTasks(taskList[listName]?.completedTasks!);
    }
  }, [taskList, listName]);

  useEffect(() => {
    console.log({tasksData});
  }, [tasksData]);

  const dispatch = useDispatch();

  const handleCollapse = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCollapase(prev => !prev);
  };

  const ListEmptyComponent = () => (
    <View style={styles?.listEmpty}>
      <Image
        source={require('@assets/images/noTask.png')}
        style={styles?.listEmptyImage}
      />
      <CustomText.BodyLarge marginTop={hp(32)}>
        No task yet
      </CustomText.BodyLarge>
      <CustomText.Caption
        textAlign={'center'}
        marginTop={hp(8)}
        customStyles={{maxWidth: '85%'}}
        color={colors?.secondary}>
        Add your to-dos and keep track of them across Google Workspaces
      </CustomText.Caption>
    </View>
  );

  const TaskCompleted = () => (
    <View style={styles?.listEmpty}>
      <Image
        source={require('@assets/images/noTask.png')}
        style={styles?.listEmptyImage}
      />
      <CustomText.BodyLarge marginTop={hp(32)}>
        All Task Completed
      </CustomText.BodyLarge>
      <CustomText.Caption
        textAlign={'center'}
        marginTop={hp(8)}
        customStyles={{maxWidth: '85%'}}
        color={colors?.secondary}>
        Nice work!
      </CustomText.Caption>
    </View>
  );

  const renderItem = ({
    item,
    getIndex,
    drag,
    isActive,
  }: RenderItemParams<task>) => {
    let taskIndex = getIndex();
    const handleCompleteTask = () => {
      let newOngoingTask = [...taskList[listName].ongoingTasks];
      newOngoingTask.splice(taskIndex!, 1);
      // console.log({newOngoingTask});
      let newTaskList = {
        [listName]: {
          ...taskList[listName],
          ongoingTasks: newOngoingTask,
          completedTasks: [
            ...taskList[listName]?.completedTasks!,
            {...item, completed: true},
          ],
        },
      };
      dispatch(setTaskList(newTaskList));
    };

    return (
      <TaskCard
        title={item?.taskTitle}
        date={item?.selectedDate}
        completed={item?.completed}
        description={item?.taskDescription}
        onLongPress={drag}
        onPress={handleCompleteTask}
        disabled={isActive}
      />
    );
  };

  return (
    <View style={styles.main}>
      {/* <CustomText.BodyLarge marginTop={hp(32)}>{listName}</CustomText.BodyLarge> */}
      {(completedTasks.length > 0 && tasksData.length > 0) ||
      ((tasksData.length === 0 || tasksData.length > 0) &&
        completedTasks.length === 0) ? (
        <View style={[styles.inner, completedTasks.length < 1 && {flex: 1}]}>
          <DraggableFlatList
            data={tasksData}
            containerStyle={[completedTasks.length < 1 && {flex: 1}]}
            contentContainerStyle={[completedTasks.length < 1 && {flex: 1}]}
            onDragEnd={({data}) => setTasksData(data)}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            ListEmptyComponent={<ListEmptyComponent />}
          />
        </View>
      ) : null}
      {completedTasks.length > 0 && (
        <View
          style={[
            styles.completedContainer,
            {marginTop: tasksData.length > 0 ? hp(32) : 0},
          ]}>
          <TouchableOpacity activeOpacity={0.8} onPress={handleCollapse}>
            <Row marginTop={hp(16)}>
              <CustomText.BodySmall>
                Completed Task({completedTasks.length})
              </CustomText.BodySmall>
              <Ionicons
                name={'chevron-down'}
                color={colors?.secondary}
                size={wp(20)}
              />
            </Row>
          </TouchableOpacity>
          {!collapse && (
            <DraggableFlatList
              data={completedTasks}
              containerStyle={{flex: 1}}
              contentContainerStyle={{flex: 1}}
              onDragEnd={({data}) => setTasksData(data)}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              ListEmptyComponent={<ListEmptyComponent />}
            />
          )}
          {collapse && tasksData.length === 0 && <TaskCompleted />}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  inner: {
    // flex: 1,
    marginHorizontal: wp(20),
  },
  listEmpty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp(20),
  },
  listEmptyImage: {
    width: wp(175),
    height: wp(228),
    resizeMode: 'contain',
  },
  completedContainer: {
    flex: 1,
    // marginTop: hp(32),
    borderTopWidth: wp(1),
    borderColor: '#3D4043',
    paddingHorizontal: wp(20),
  },
});

export default TaskList;
