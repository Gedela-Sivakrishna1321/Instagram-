package com.instagram.Service;

import java.util.List;

import com.instagram.Exceptions.PostException;
import com.instagram.Exceptions.UserException;
import com.instagram.Models.Post;

public interface PostService {
	
	public Post createPost(Post post, Integer userId) throws UserException;
	
	public String deletePost(Integer postId, Integer userId) throws UserException,PostException;
	
	public List<Post> findPostByUserId(Integer userId) throws UserException;
	
	public Post findPostById(Integer postId) throws PostException;
	
	public List<Post> findAllPostByUserIds(List<Integer> UserIds) throws PostException, UserException;
	
	public String savedPost(Integer postId, Integer userId) throws PostException, UserException;
	
	public String unsavedPost(Integer postId, Integer userId) throws PostException, UserException;
	
	public Post likePost(Integer postId, Integer userId) throws PostException, UserException;
	
	public Post unlikePost(Integer postId, Integer userId) throws PostException, UserException;

}
