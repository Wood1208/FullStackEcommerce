import "@/global.css";
import { Link, Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Pressable } from "react-native";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Icon } from "@/components/ui/icon";
import { ShoppingCart, User } from "lucide-react-native";
import { Text } from "@/components/ui/text";

import { useCart } from "@/store/cartStore";
import { useAuth } from "@/store/authStore";

const queryClient = new QueryClient();

export default function RootLayout() {
  const cartItemsNum =  useCart((state) => state.items.length);

  const isLoggedIn = useAuth((s) => !!s.token);

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="light">
        <Stack 
          screenOptions={{ 
            headerRight: () =>
              cartItemsNum > 0 && (
              <Link href={'/cart'} asChild>
                <Pressable className="flex-row gap-2">
                  <Icon as={ShoppingCart} />
                  <Text>{cartItemsNum}</Text>
                </Pressable>
              </Link>
            ),
            headerTitleAlign: 'center',
          }}
        >
          <Stack.Screen 
            name="index" 
            options={{
              title: "Shop",
              headerLeft: () => 
                !isLoggedIn && (
                <Link href={'/login'} asChild>
                  <Pressable className="flex-row gap-2">
                    <Icon as={User} />
                  </Pressable>
                </Link>
              ),
            }}
          />
          <Stack.Screen
           name="product/[id]" 
           options={{ title: "Product" }}
          />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
