package com.instagram.Service;

import java.time.LocalDateTime;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.instagram.Exceptions.PostException;
import com.instagram.Exceptions.UserException;
import com.instagram.Models.Post;
import com.instagram.Models.User;
import com.instagram.Repository.PostRepository;
import com.instagram.Repository.UserRepository;
import com.instagram.UserDto.UserDto;


@Service
public class PostServiceImplementation implements PostService {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private PostRepository postRepository;
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public Post createPost(Post post, Integer userId) throws UserException {
		
		User user = userService.findUserById(userId);
		
		UserDto userDto = new UserDto();
		userDto.setEmail(user.getEmail());
		userDto.setId(user.getId());
		userDto.setName(user.getName());
		userDto.setUsername(user.getUsername());
		userDto.setUserImage(user.getImage());
		
		post.setUser(userDto);
		post.setCreatedAt(LocalDateTime.now());
		Post createdPost = postRepository.save(post);
		return createdPost;
	}

	@Override
	public String deletePost(Integer postId, Integer userId) throws UserException, PostException {
		
		Post post = findPostById(postId);
		
		User user = userService.findUserById(userId);
		
		if(post.getUser().getId().equals(user.getId())) {
			postRepository.deleteById(post.getId());
			return "Post deleted successfully";
		}
		
		return "Users can delete posts only which are posted by them";
	}

	@Override
	public List<Post> findPostByUserId(Integer userId) throws UserException {
		
		List<Post> posts = postRepository.findByUserId(userId);
		
		
		
		return posts;
	}

	@Override
	public Post findPostById(Integer postId) throws PostException {
		
		Optional<Post> optional = postRepository.findById(postId);
		
		if(optional.isPresent()) {
			return optional.get();
		}
		
		throw new PostException("Post not found with id : "+postId);
	}

	@Override
	public List<Post> findAllPostByUserIds(List<Integer> UserIds) throws PostException, UserException {
		
		List<Post> posts = postRepository.findAllPostByUserIds(UserIds);
		
		if(posts.size() == 0) {
			throw new PostException("No posts were found");
		}
		
		return posts;
	}

	@Override
	public String savedPost(Integer postId, Integer userId) throws PostException, UserException {
		
		Post post = findPostById(postId);
		
		User user = userService.findUserById(userId);
		
		if(!user.getSavedPost().contains(post)) {
			user.getSavedPost().add(post);
			userRepository.save(user);
		}
		
		return "Post saved successfully";
		
	}

	@Override
	public String unsavedPost(Integer postId, Integer userId) throws PostException, UserException {
		
		Post post = findPostById(postId);
		
		User user = userService.findUserById(userId);
		
		if(user.getSavedPost().contains(post)) {
			user.getSavedPost().remove(post);
			userRepository.save(user);
		}
		
		return "Post unsaved successfully";
	}

	@Override
	public Post likePost(Integer postId, Integer userId) throws PostException, UserException {
		
		Post post = findPostById(postId);
		
		User user = userService.findUserById(userId);
		

		UserDto userDto = new UserDto();
		userDto.setEmail(user.getEmail());
		userDto.setId(user.getId());
		userDto.setName(user.getName());
		userDto.setUsername(user.getUsername());
		userDto.setUserImage(user.getImage());
		
		post.getLikedByUsers().add(userDto);
		
		System.out.println(post);
		return postRepository.save(post);
	}

	@Override
	public Post unlikePost(Integer postId, Integer userId) throws PostException, UserException {

		Post post = findPostById(postId);
		
		User user = userService.findUserById(userId);
		

		UserDto userDto = new UserDto();
		
		userDto.setEmail(user.getEmail());
		userDto.setId(user.getId());
		userDto.setName(user.getName());
		userDto.setUsername(user.getUsername());
		userDto.setUserImage(user.getImage());
		
		post.getLikedByUsers().remove(userDto);
		System.out.println(post);
		
		return postRepository.save(post);	}

}
