import { Image } from "react-native"
import { Tabs } from "expo-router/tabs"
import { StatusBar } from "expo-status-bar"
import { MaterialIcons } from "@expo/vector-icons"
import Logo from "assets/ideasphere_logo.png"
import tailwindColors from "tailwindcss/colors"

import { colors } from "@ideasphere/tailwind-config/themeColors"

export default function Layout() {
  return (
    <>
      <Tabs
        screenOptions={{
          lazy: true,
          title: undefined,
          tabBarLabel: undefined,
          headerTitle: LogoImage,
          tabBarShowLabel: false,
          tabBarIconStyle: {
            width: 40,
            height: 40,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ size, focused }) => (
              <TabBarIcon name="home" size={size} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="add"
          options={{
            tabBarIcon: ({ size, focused }) => (
              <TabBarIcon name="add-box" size={size * 1.5} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ size, focused }) => (
              <TabBarIcon name="person" size={size} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="idea/[id]"
          options={{
            href: null,
            headerShown: false,
          }}
        />
      </Tabs>
      <StatusBar style="dark" />
    </>
  )
}

interface TabBarIconProps extends React.ComponentProps<typeof MaterialIcons> {
  focused: boolean
}

const TabBarIcon: React.FC<TabBarIconProps> = ({ name, focused, size }) => {
  return (
    <MaterialIcons
      name={name}
      size={size}
      color={focused ? colors.primary : tailwindColors.gray[400]}
    />
  )
}

const LogoImage: React.FC = () => (
  <Image source={Logo} className="ml-0 mr-auto h-[50px] w-[150px]" resizeMode="contain" />
)
