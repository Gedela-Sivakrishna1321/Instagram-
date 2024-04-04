package com.instagram.Service;

import com.instagram.Exceptions.CommentException;
import com.instagram.Exceptions.PostException;
import com.instagram.Exceptions.UserException;
import com.instagram.Models.Comment;

public interface CommentService {
	
	public Comment createComment(Comment comment,Integer postId, Integer userId) throws UserException,PostException;
	
	public Comment findCommentById(Integer commentId) throws CommentException;
	
	public Comment likeComment(Integer commentId, Integer userId) throws CommentException, UserException;
	
	public Comment unlikeComment(Integer commentId, Integer userId) throws CommentException, UserException;

}
