import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from "react-native";
import io from "socket.io-client";
import BottomNav from "../components/BottomNav";
import TopBar from "../components/TopBar";

const DATA = [
  {
    id: "1",
    name: "김철수",
    product: {
      id: "p1",
      //image: require('/Images/product1.png'),
      title: "초코파이 팝니다.",
    },
    lastMessage: "배송 언제 해주나요?",
  },
  {
    id: "2",
    name: "이영희",
    product: {
      id: "p2",
      //image: require('./Images/product2.png'),
      title: "빵 몇 개 팔아요.",
    },
    lastMessage: "택배비 누가 부담합니까?",
  },
  {
    id: "3",
    name: "박민수",
    product: {
      id: "p3",
      //image: require('./Images/product3.png'),
      title: "자전거 팔아요.",
    },
    lastMessage: "상태 어떤가요?",
  },
  {
    id: "4",
    name: "홍길동",
    product: {
      id: "p4",
      //image: require('./Images/product4.png'),
      title: "의자 팝니다.",
    },
    lastMessage: "가격 어떻게 되나요?",
  },
];

export default function ChatRoom({ navigation }) {
  /** 채팅 기능 구현 부분 */
  useEffect(() => {
    // 소켓 연결 설정
    const socket = io("YOUR_BACKEND_SERVER_URL");

    // 메시지 수신 이벤트 핸들러
    socket.on("chatMessage", (message) => {
      console.log("Received message:", message);
      // TODO: 받은 메시지를 적절히 처리하는 로직을 구현
    });

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      socket.disconnect();
    };
  }, []);
  /** 지원 담당 */

  // 채팅 목록을 보여주는 함수
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.chatContainer}
        onPress={() => navigation.navigate("Chat")}
      >
        <Image
          style={styles.chatImage} //source={require('./Images/product1.png')}
        />
        <View style={styles.chatInfoContainer}>
          <View style={styles.chatTitleContainer}>
            <Text
              style={styles.chatTitle}
              numberOfLines={1} // 보여질 최대 줄 수
              ellipsizeMode="tail" // 텍스트가 길어지면 ...으로 표시
            >
              {item.product.title}
            </Text>
            <Text style={styles.chatName}>{item.name}</Text>
          </View>
          <Text
            style={styles.chatLastMessage}
            numberOfLines={1} // 보여질 최대 줄 수
            ellipsizeMode="tail" // 텍스트가 길어지면 ...으로 표시
          >
            {item.lastMessage}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TopBar navigation={navigation} />
      </View>

      <View style={styles.body}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>

      <BottomNav navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    alignItems: "flex-end",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    marginHorizontal: 10,
    paddingBottom: 12,
  },

  body: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: 10,
  },

  chatContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
  },

  chatImage: {
    backgroundColor: "#91B391", // 이미지 위치 확인 위해 임시로 배경색 지정
    width: 50,
    height: 50,
    borderRadius: 20,
    marginHorizontal: 16,
  },

  chatInfoContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 5,
  },

  chatTitleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },

  chatTitle: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 16,
  },

  chatName: {
    color: "#999",
    marginRight: 18,
  },

  chatLastMessage: {
    color: "#666",
  },
});