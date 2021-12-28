import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import CustomButton from './CustomButton';

export interface ToggleListProps {
  list: string[];
  deselect?: boolean;
  onChange?: (selected: string) => void;
  style?: ViewStyle;
  title: string;
}
export default function ToggleList(props: ToggleListProps) {
  const [list] = useState<string[]>(props.list);
  const [selectedIndex, setSelectedIndex] = useState<number>(
    props.deselect ? -1 : 0,
  );
  useEffect(() => {
    if (props.onChange && !props.deselect) {
      props.onChange(list[0]);
    }
  }, []);

  useEffect(() => {
    if (props.onChange) {
      props.onChange(list[selectedIndex]);
    }
  }, [selectedIndex]);

  function handleSelect(index: number) {
    if (index === selectedIndex && props.deselect) {
      setSelectedIndex(-1);
    } else {
      console.log('selected:', index, list[index]);
      setSelectedIndex(index);
    }
  }

  function render() {
    const listComponents = list.map((item, index) => {
      return (
        <CustomButton
          title={item}
          key={item + index}
          tintColor={index === selectedIndex ? 'white' : 'black'}
          style={{
            ...styles.button,
            ...(index === selectedIndex && styles.selectedButton),
          }}
          onPress={() => handleSelect(index)}
        />
      );
    });
    return (
      <View style={props.style}>
        <Text>{props.title}</Text>
        <View style={styles.container}>{listComponents}</View>
      </View>
    );
  }
  return render();
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selectedButton: {
    backgroundColor: '#b87cd9',
    marginHorizontal: 2,
  },
  button: {
    backgroundColor: undefined,
    borderColor: '#b87cd9',
    borderWidth: 2,
    marginHorizontal: 2,
  },
});
