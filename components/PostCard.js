import React, { useContext } from 'react'
import {
    Card,
    UserInfo,
    UserImg,
    UserName,
    UserInfoText,
    PostTime,
    PostText,
    PostImg,
    InteractionWrapper,
    Interaction,
    InteractionText,
    Divider
} from '../styles/FeedStyles'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { AuthContext } from '../navigation/AuthProvider'
import moment from 'moment'
import ProgressiveImage from './ProgressiveImage'


export const PostCard = ({ item, onDelete }) => {
    const { userId } = useContext(AuthContext)

    const likeIcon = item.liked ? 'heart' : 'heart-outline'
    const likeIconColor = item.liked ? '#2e64e5' : '#333'
    let likeText;
    let commentText;

    if (item.likes == 1) {
        likeText = '1 Like'
    }

    else if (item.likes > 1) {
        likeText = item.likes + ' Likes';
    }

    else {
        likeText = 'Like';
    }


    if (item.comments == 1) {
        commentText = '1 Comment'
    }

    else if (item.comments > 1) {
        commentText = item.comments + ' Comments';
    }

    else {
        commentText = 'Comment';
    }

    return (
        <Card>
            <UserInfo>
                <UserImg source={{ uri: item.userImg }} />
                <UserInfoText>
                    <UserName>{item.userName}</UserName>
                    {/* <PostTime>{item.postTime.toString()}</PostTime> */}
                    <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
                </UserInfoText>
            </UserInfo>
            <PostText>{item.post}</PostText>
            {/* {item.postImg != null ? <PostImg source={{ uri: item.postImg }} /> : <Divider />} */}
            {item.postImg != null ? (
                <ProgressiveImage
                    defaultImageSource={require('../assets/default-img.jpg')}
                    source={{ uri: item.postImg }}
                    style={{ width: '100%', height: 250 }}
                    resizeMode='cover'
                />
            ) : <Divider />}



            <InteractionWrapper>

                <Interaction active={item.liked}>
                    <Ionicons name={likeIcon} size={25} color={likeIconColor} />
                    <InteractionText active={item.liked}>{likeText}</InteractionText>
                </Interaction>

                <Interaction>
                    <Ionicons name="md-chatbubble-outline" size={25} />
                    <InteractionText>{commentText}</InteractionText>
                </Interaction>

                {userId == item.userId ? (
                    <Interaction onPress={() => onDelete(item.id)}>
                        <Ionicons name="md-trash-bin" size={25} />
                    </Interaction>
                ) : null}

            </InteractionWrapper>

            {/* <InteractionText>userId: {userId}</InteractionText>
            <InteractionText>item User Id: {item.userId}</InteractionText> */}

        </Card>

    )
}