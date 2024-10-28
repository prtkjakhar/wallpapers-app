import { StyleSheet, View } from 'react-native';
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';

export default function SkeletonLoader() {
  const colorMode = 'light';

  return (
    <MotiView
      transition={{
        type: 'timing',
      }}
      style={[styles.container, styles.padded]}
      animate={{ backgroundColor: '#ffffff' }}>
      <Skeleton colorMode={colorMode} height={200} width={'100%'} />
      <Spacer />
      <Spacer height={8} />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <Skeleton colorMode={colorMode} width={150} height={200} />
        <Skeleton colorMode={colorMode} width={150} height={200} />
      </View>
      <Spacer height={8} />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <Skeleton colorMode={colorMode} width={150} height={200} />
        <Skeleton colorMode={colorMode} width={150} height={200} />
      </View>
      <Spacer height={8} />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <Skeleton colorMode={colorMode} width={150} height={200} />
        <Skeleton colorMode={colorMode} width={150} height={200} />
      </View>
    </MotiView>
  );
}

const Spacer = ({ height = 16 }) => <View style={{ height }} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  padded: {
    padding: 16,
  },
});
