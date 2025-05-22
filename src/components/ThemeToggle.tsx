// ThemeSwitch.tsx
import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import Svg, { Polygon } from 'react-native-svg';
const ThemeSwitch = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const progress = useSharedValue(isDarkMode ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(isDarkMode ? 1 : 0, { duration: 400 });
  }, [isDarkMode]);

  const containerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 1], ['#a5c9ff', '#1e2a47']),
  }));

  const sunMoonTranslate = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(progress.value, [0, 1], [4, 54]) }],
  }));

  return (
    <View style={styles.wrapper}>
      <Pressable onPress={toggleTheme}>
        <Animated.View style={[styles.switchContainer, containerStyle]}>
          {/* Background bubbles or stars */}
          {!isDarkMode ? (
            <>
              <View style={[styles.bubble, { top: 8, left: 36 }]} />
              <View style={[styles.bubble, { top: 14, left: 48, width: 6, height: 6 }]} />
              <View style={[styles.bubble, { top: 5, left: 48, width: 6, height: 6 }]} />
            </>
          ) : (
            <>
              <Svg width="10" height="10" viewBox="0 0 100 100" style={{ position: 'absolute', top: 8, left: 16 }}>
                <Polygon
                  points="50,5 61,38 95,38 67,59 78,91 50,70 22,91 33,59 5,38 39,38"
                  fill="#fff"
                />
              </Svg>

              <Svg width="10" height="10" viewBox="0 0 100 100" style={{ position: 'absolute', top: 12, left: 32 }}>
                <Polygon
                  points="50,5 61,38 95,38 67,59 78,91 50,70 22,91 33,59 5,38 39,38"
                  fill="#fff"

                />
              </Svg>

              <Svg width="10" height="10" viewBox="0 0 100 100" style={{ position: 'absolute', top: 20, left: 24 }}>
                <Polygon
                  points="50,5 61,38 95,38 67,59 78,91 50,70 22,91 33,59 5,38 39,38"
                  fill="#fff"
                  opacity={0.9}
                />
              </Svg>
              <Svg width="10" height="10" viewBox="0 0 100 100" style={{ position: 'absolute', top: 15, left: 5 }}>
                <Polygon
                  points="50,5 61,38 95,38 67,59 78,91 50,70 22,91 33,59 5,38 39,38"
                  fill="#fff"
                  opacity={0.9}
                />
              </Svg>
            </>


          )}

          {/* Sun or Moon */}
          <Animated.View style={[styles.sunMoon, sunMoonTranslate]}>
            {!isDarkMode ? (
              <View style={styles.sunContainer}>
                <View style={styles.sunCore} />
                {/* Rays */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.sunRay,
                      {
                        transform: [
                          { rotate: `${i * 45}deg` },
                          { translateY: -12 },
                        ],
                      },
                    ]}
                  />
                ))}
              </View>

            ) : (
              // Replace your moon <View> with this:
              <View style={styles.moonContainer}>
                <View style={styles.moonBase} />
                <View style={styles.moonCutout} />
              </View>


            )}
          </Animated.View>
        </Animated.View>
      </Pressable>
    </View>
  );
};

export default ThemeSwitch;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  label: {
    fontWeight: 'bold',
    color: '#999',
    fontSize: 16,
  },
  activeLabel: {
    color: '#fff',
  },
  switchContainer: {
    width: 90,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 4,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  sunMoon: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sunContainer: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  sunCore: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: '#FFD700', // bright yellow
  },

  sunRay: {
    position: 'absolute',
    width: 2,
    height: 5,
    backgroundColor: '#FFD700',
    borderRadius: 1,
  },
  moonContainer: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '-25deg' }], 
  },

  moonBase: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    position: 'absolute',
  },

  moonCutout: {
    width: 24,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1e2a47', // Dark background
    position: 'absolute',
    left: 10, // This controls how crescent it looks
    top: 0,
  },



  bubble: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  star: {
    position: 'absolute',
    width: 6,
    height: 6,
    backgroundColor: '#fff',
    transform: [{ rotate: '45deg' }],
    borderRadius: 1.5,
    shadowColor: '#fff',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
  },

});
