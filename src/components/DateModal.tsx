import React, {useCallback, useMemo} from 'react';
import CustomText from '@components/CustomText';
import BottomModal, {BottomModalProps} from '@components/BottomModal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {hp, wp} from '@utils/responsive-dimension';
import {StyleSheet, View} from 'react-native';
import Header from './Header';
import {Calendar, DateData} from 'react-native-calendars';
import moment from 'moment';
import {colors} from '@theme/colors';

interface DateModalProps extends Partial<BottomModalProps> {
  closeModal: () => void;
  selectedDate: string | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>;
}

const INITIAL_DATE = moment().format('YYYY-MM-DD');

const DateModal = ({
  closeModal,
  selectedDate,
  setSelectedDate,
  ...rest
}: DateModalProps) => {
  const inserts = useSafeAreaInsets();
  const bottom = inserts.bottom;

  // const getDate = (count: number) => {
  //   const date = new Date(INITIAL_DATE);
  //   const newDate = date.setDate(date.getDate() + count);
  //   return CalendarUtils.getCalendarDateString(newDate);
  // };

  const onDayPress = useCallback(
    (day: DateData) => {
      // console.log(day);
      setSelectedDate(day.dateString);
    },
    [setSelectedDate],
  );

  const marked = useMemo(() => {
    return {
      [selectedDate!]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: colors?.primary,
        selectedTextColor: 'white',
      },
    };
  }, [selectedDate]);

  const styles = StyleSheet.create({
    main: {
      // paddingTop: hp(16),
      paddingHorizontal: wp(16),
      paddingBottom: hp(bottom + 24),
    },
    seperator: {
      // width: '100%',
      borderTopWidth: wp(1),
      borderTopColor: '#dfdfdf',
      marginTop: hp(22),
    },
    calendar: {
      marginBottom: 10,
    },
  });

  return (
    <BottomModal {...rest} closeModal={closeModal}>
      <View style={styles.main}>
        <Header
          titleStyle={{fontSize: wp(14)}}
          title={'Date and Time'}
          rightElement={
            <CustomText.BodySmall onPress={closeModal}>
              Done
            </CustomText.BodySmall>
          }
        />
        {/* <CustomText.BodySmall>
          {moment(selected).format('MMMM Do YYYY, h:mm a')}
        </CustomText.BodySmall> */}
        <Calendar
          enableSwipeMonths
          current={INITIAL_DATE}
          style={styles.calendar}
          onDayPress={onDayPress}
          markedDates={marked}
          theme={{
            backgroundColor: '#36373A',
            calendarBackground: '#36373A',
            dayTextColor: 'white',
            arrowColor: 'white',
            monthTextColor: 'white',
            textDayFontFamily: 'Poppins-Regular',
            textDayFontSize: wp(14),
            textMonthFontFamily: 'Poppins-Medium',
            textMonthFontSize: wp(14),
          }}
        />
      </View>
    </BottomModal>
  );
};

export default DateModal;
