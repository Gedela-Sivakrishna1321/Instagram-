package com.instagram.Service;

import com.instagram.Exceptions.*;
import com.instagram.Models.*;

public interface UserService {

	public User registerUser(User user) throws UserException;
	public User findUserById(Integer userId) throws UserException;
	public User findUserProfile(String token) throws UserException;
	public User findUserByUsername(String username) throws UserException;
	public String followUser(Integer reqUserId, Integer followUserId) throws UserException;
	public String unFollowUser(Integer reqUserId, Integer followUserId) throws UserException;
	public java.util.List<User> findUserByIds(java.util.List<Integer> userIds) throws UserException;
	public java.util.List<User> searchUser(String query) throws UserException;
	public User updateUserDetails(User updatedUser, User existingUser) throws UserException;
}
