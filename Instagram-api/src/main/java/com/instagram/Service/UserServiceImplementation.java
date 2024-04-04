package com.instagram.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.instagram.UserDto.*;
import com.instagram.security.JwtTokenClaims;
import com.instagram.security.JwtTokenProvider;
import com.instagram.Exceptions.*;
import com.instagram.Models.*;
import com.instagram.Repository.*;

@Service
public class UserServiceImplementation implements UserService {

	@Autowired
	UserRepository userRepository;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	JwtTokenProvider jwtTokenProvider;

	@Override
	public User registerUser(User user) throws UserException {

		Optional<User> isEmailExist = userRepository.findByEmail(user.getEmail());

		if(isEmailExist.isPresent()) {
			throw new UserException("Email Id already registered ! ");
		}

		Optional<User> isUsernameExist = userRepository.findByUsername(user.getUsername());

		if(isUsernameExist.isPresent()) {
			throw new UserException("Username already taken ! ");
		}

		if(user.getEmail() == null || user.getPassword() == null || user.getUsername() == null || user.getName() == null) {
			throw new UserException("All feilds are required !");
		}

		// New obj is created because we don't want the save the obj passed by user directly
		// There may be some feilds like roles, which need to be set manually
		User newUser = new User();
		newUser.setEmail(user.getEmail());
		newUser.setUsername(user.getUsername());
		newUser.setPassword(passwordEncoder.encode(user.getPassword()));
		newUser.setName(user.getName());
		
		System.out.println(newUser);	
		return userRepository.save(newUser);
	}

	@Override
	public User findUserById(Integer userId) throws UserException {

		Optional<User> opt = userRepository.findById(userId);

		if(opt.isPresent()) {
			return opt.get();
		}

		throw new UserException("user not found with id: "+userId);
	}

	@Override
	public User findUserProfile(String token) throws UserException {
		
		token = token.substring(7);
		
		JwtTokenClaims jwtTokenClaims = jwtTokenProvider.getJwtClaimsFromToken(token);
		
		String email = jwtTokenClaims.getEmail();
		
		Optional<User> userOptional = userRepository.findByEmail(email);
		
		if(userOptional.isPresent()) {
			return userOptional.get();
		}
		
		throw new UserException("invalid token...!");
	}

	@Override
	public User findUserByUsername(String username) throws UserException {
		Optional<User> user = userRepository.findByUsername(username);
		if(user.isPresent()) {
			return user.get();
		}
		
		throw new UserException("user not found with username : "+username);
	}

	@Override
	public String followUser(Integer reqUserId, Integer followUserId) throws UserException {

		User reqUser = findUserById(reqUserId);
		User followUser = findUserById(followUserId);

		UserDto follower = new UserDto();
		follower.setEmail(reqUser.getEmail());
		follower.setId(reqUser.getId());
		follower.setName(reqUser.getName());
		follower.setUserImage(reqUser.getImage());
		follower.setUsername(reqUser.getUsername());

		UserDto following = new UserDto();
		following.setEmail(followUser.getEmail());
		following.setId(followUser.getId());
		following.setName(followUser.getName());
		following.setUserImage(followUser.getImage());
		following.setUsername(followUser.getUsername());

		reqUser.getFollowing().add(following);
		followUser.getFollower().add(follower);

		userRepository.save(reqUser);
		userRepository.save(followUser);

		return "You're following "+followUser.getUsername();
	}

	@Override
	public String unFollowUser(Integer reqUserId, Integer followUserId) throws UserException {
		User reqUser = findUserById(reqUserId);
		User followUser = findUserById(followUserId);

		UserDto follower = new UserDto();
		follower.setEmail(reqUser.getEmail());
		follower.setId(reqUser.getId());
		follower.setName(reqUser.getName());
		follower.setUserImage(reqUser.getImage());
		follower.setUsername(reqUser.getUsername());

		UserDto following = new UserDto();
		following.setEmail(followUser.getEmail());
		following.setId(followUser.getId());
		following.setName(followUser.getName());
		following.setUserImage(followUser.getImage());
		following.setUsername(followUser.getUsername());

		reqUser.getFollowing().remove(following);
		followUser.getFollower().remove(follower);

		userRepository.save(reqUser);
		userRepository.save(followUser);
		return "You unfollowed "+followUser.getUsername();
	}

	@Override
	public List<User> findUserByIds(List<Integer> userIds) throws UserException {
		
		List<User> users = userRepository.findAllUsersByUserIds(userIds);
		
		if(users.size() == 0) {
			throw new UserException("Users not found with the given Ids");
		}
		
		return users;
	}

	@Override
	public List<User> searchUser(String query) throws UserException {

		List<User> users = userRepository.findByQuery(query);

		if(users.size() == 0) {
			throw new UserException("user not found");
		}

		return users;
	}

	@Override
	public User updateUserDetails(User updatedUser, User existingUser) throws UserException {
		System.out.println(updatedUser);
		
		if(updatedUser.getId().equals(existingUser.getId())) {
			
//			if(updatedUser.getPassword() != null)
//					existingUser.setPassword(updatedUser.getPassword());
			
			if(updatedUser.getBio() != null) 
					existingUser.setBio(updatedUser.getBio());
			
			if(updatedUser.getEmail() != null) 
					existingUser.setEmail(updatedUser.getEmail());
			
			if(updatedUser.getName() != null) 
					existingUser.setName(updatedUser.getName());
			
			if(updatedUser.getUsername() != null)
					existingUser.setUsername(updatedUser.getUsername());
			
			if(updatedUser.getMobile() != null)
					existingUser.setMobile(updatedUser.getMobile());
			
			if(updatedUser.getGender() != null) 
					existingUser.setGender(updatedUser.getGender());
			
			if(updatedUser.getWebsite() != null) 
					existingUser.setWebsite(updatedUser.getWebsite());
			
			if(updatedUser.getImage() != null)
					existingUser.setImage(updatedUser.getImage());
			
		  return userRepository.save(existingUser);
		}
		
		throw new UserException("You cannot update the user information ");
	}

}
