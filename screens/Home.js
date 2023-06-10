import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import BottomNav from "../components/BottomNav";
import TopBar from "../components/TopBar";
import { AntDesign } from "@expo/vector-icons";
import { signOut } from "../services/auth";
import { getAllImages } from "../services/storage";
import { getUserInfo } from "../services/auth";
import styles from "../styles/HomeStyles";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Home({ navigation }) {
  const [images, setImages] = useState([]);
  const [name, setName] = useState(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userInfo = await getUserInfo();
        setName(userInfo.name);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserName();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesList = await getAllImages();
        setImages(imagesList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchImages();
  }, []);
  /*
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageURLs = await getAllImages();
        setImages(imageURLs);
      } catch (error) {
        console.log('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);*/

  // 임시 상품 데이터
  const [products, setProducts] = useState([
    "상품 1",
    "상품 2",
    "상품 3",
    "상품 4",
    "상품 5",
  ]);

  // 임시 상점 데이터
  const [stores, setStores] = useState([
    "상점 1",
    "상점 2",
    "상점 3",
    "상점 4",
    "상점 5",
  ]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <TopBar navigation={navigation} />

      <View style={styles.body}>
        <TouchableOpacity
          onPress={() => signOut(navigation)}
          style={styles.banner}
        >
          <Text>{name}님 환영합니다!</Text>
        </TouchableOpacity>

        <Text style={styles.bodyText}>추천 상품</Text>
        <View style={styles.productContainer}>
          <ScrollView pagingEnabled horizontal>
            {images.map((value, key) => (
              <TouchableOpacity style={styles.product} key={key}>
                <Image style={styles.product} source={{ uri: value }} />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.scrollIcon}>
            <AntDesign name="rightcircle" size={24} color="#91B391" />
          </TouchableOpacity>
        </View>

        <Text style={styles.bodyText}>인기 상점</Text>
        <View style={styles.productContainer}>
          <ScrollView pagingEnabled horizontal>
            {stores.map((value, key) => (
              <TouchableOpacity style={styles.product} key={key}>
                <Text>{value}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.scrollIcon}>
            <AntDesign name="rightcircle" size={24} color="#91B391" />
          </TouchableOpacity>
        </View>
      </View>

      <BottomNav navigation={navigation} />
    </View>
  );
}