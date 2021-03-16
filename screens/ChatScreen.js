import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, Button, ScrollView } from 'react-native'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function ChatScreen() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                _id: 2,
                text: 'Hello world',
                createdAt: new Date(),
                user: {
                    _id: 1,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#2e64e5'
                    }
                }}
                textStyle={{
                    right: {
                        color: '#fff'
                    }
                }}
            />
        )
    }

    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View>
                    <MaterialCommunityIcons name="send-circle" size={32} style={{ marginBottom: 5, marginRight: 5 }} color='#2e64e5' />
                </View>
            </Send>
        )
    }

    const scrollToBottomComponent = (props) => {
        return (
            <Send {...props}>
                <View>
                    <FontAwesome name="angle-double-down" size={22} color='#333' />
                </View>
            </Send>
        )
    }

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
            }}
            renderBubble={renderBubble}
            alwaysShowSend
            renderSend={renderSend}
            scrollToBottom
            scrollToBottomComponent={scrollToBottomComponent}
        />
    )
}
// export default function ChatScreen() {
//     return (
//         <ScrollView style={{ flex: 1, marginTop: 35 }} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', }}>
//             <SkeletonPlaceholder>
//                 <View style={{ flexDirection: "row", alignItems: "center" }}>
//                     <View style={{ width: 60, height: 60, borderRadius: 50 }} />
//                     <View style={{ marginLeft: 20 }}>
//                         <View style={{ width: 120, height: 20, borderRadius: 4 }} />
//                         <View
//                             style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
//                         />
//                     </View>
//                 </View>
//                 <View style={{ marginTop: 10, marginBottom: 30 }}>
//                     <View style={{ width: 300, height: 20, borderRadius: 4 }}></View>
//                     <View style={{ marginTop: 6, width: 250, height: 20, borderRadius: 4 }}></View>
//                     <View style={{ marginTop: 6, width: 350, height: 200, borderRadius: 4 }}></View>
//                 </View>
//             </SkeletonPlaceholder>

//             {/* <SkeletonPlaceholder>
//                 <View style={{ flexDirection: "row", alignItems: "center" }}>
//                     <View style={{ width: 60, height: 60, borderRadius: 50 }} />
//                     <View style={{ marginLeft: 20 }}>
//                         <View style={{ width: 120, height: 20, borderRadius: 4 }} />
//                         <View
//                             style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
//                         />
//                     </View>
//                 </View>
//                 <View style={{ marginTop: 10, marginBottom: 30 }}>
//                     <View style={{ width: 300, height: 20, borderRadius: 4 }}></View>
//                     <View style={{ marginTop: 6, width: 250, height: 20, borderRadius: 4 }}></View>
//                     <View style={{ marginTop: 6, width: 350, height: 200, borderRadius: 4 }}></View>
//                 </View>
//             </SkeletonPlaceholder>

//             <SkeletonPlaceholder>
//                 <View style={{ flexDirection: "row", alignItems: "center" }}>
//                     <View style={{ width: 60, height: 60, borderRadius: 50 }} />
//                     <View style={{ marginLeft: 20 }}>
//                         <View style={{ width: 120, height: 20, borderRadius: 4 }} />
//                         <View
//                             style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
//                         />
//                     </View>
//                 </View>
//                 <View style={{ marginTop: 10, marginBottom: 30 }}>
//                     <View style={{ width: 300, height: 20, borderRadius: 4 }}></View>
//                     <View style={{ marginTop: 6, width: 250, height: 20, borderRadius: 4 }}></View>
//                     <View style={{ marginTop: 6, width: 350, height: 200, borderRadius: 4 }}></View>
//                 </View>
//             </SkeletonPlaceholder> */}


//         </ScrollView>


//     )
// }
