import { Image } from "react-native"
import { Tabs } from "expo-router/tabs"
import { MaterialIcons } from "@expo/vector-icons"
import Logo from "assets/ideasphere_logo.png"

export default function Layout() {
  return (
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
    </Tabs>
  )
}

interface TabBarIconProps extends React.ComponentProps<typeof MaterialIcons> {
  focused: boolean
}

const TabBarIcon: React.FC<TabBarIconProps> = ({ name, focused, size }) => {
  return <MaterialIcons name={name} size={size} color={focused ? "#04005e" : "gray"} />
}

const LogoImage: React.FC = () => (
  <Image
    source={Logo}
    style={{
      width: 150,
      height: 50,
      resizeMode: "contain",
    }}
  />
)
