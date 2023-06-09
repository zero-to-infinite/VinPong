import { FIRESTORE_DB } from "../firebaseConfig";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { uploadImage } from "./storage";
import { getUserUid } from "../services/firestore_user";

// firestore에 상품 판매 정보 추가
export async function addProduct(
  name,
  price,
  condition,
  size,
  selectedCategories,
  selectedStyles,
  detail,
  image,
  navigation
) {
  if (name == "") {
    alert("상품명을 입력해주세요!");
  } else if (price == 0) {
    alert("가격을 입력해주세요!");
  } else if (condition == "") {
    alert("상태를 체크해주세요!");
  } else if (size == "") {
    alert("사이즈를 체크해주세요!");
  } else {
    try {
      const uid = await getUserUid();
      const numericPrice = parseInt(price);

      const date = new Date();
      const downloadURL = await uploadImage(uid, image, name, date);

      await addDoc(collection(FIRESTORE_DB, "Product"), {
        uid: uid,
        name: name,
        price: numericPrice,
        condition: condition,
        size: size,
        selectedCategories: selectedCategories,
        selectedStyles: selectedStyles,
        detail: detail,
        date: date, // 작성한 날짜와 시각
        image: downloadURL,
      });

      alert(`${name}\n판매글이 성공적으로 게시되었습니다!`);
      navigation.navigate("Store");
    } catch (err) {
      alert("올바르지 않은 접근입니다.\n로그인 후 다시 시도해주세요 :(");
      navigation.navigate("Loading");
      console.log(err);
    }
  }
}

// firestore에서 특정한 상품 정보 가져오기
export async function getProduct(src) {
  const productRef = collection(FIRESTORE_DB, "Product");
  const q = query(productRef, where("image", "==", src));
  try {
    const querySnapshot = await getDocs(q);
    const productPromises = querySnapshot.docs.map((doc) => {
      const product = doc.data();
      const productInfo = {
        uid: product.uid, // 판매자의 uid
        name: product.name,
        price: product.price,
        condition: product.condition,
        size: product.size,
        category: product.selectedCategories,
        style: product.selectedStyles,
        detail: product.detail,
      };
      return productInfo;
    });
    const products = await Promise.all(productPromises);
    return products[0];
  } catch (err) {
    console.log(err);
  }
}
