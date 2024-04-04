package com.instagram.Service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.instagram.Exceptions.StoryException;
import com.instagram.Exceptions.UserException;
import com.instagram.Models.Story;
import com.instagram.Models.User;
import com.instagram.Repository.StoryRepository;
import com.instagram.Repository.UserRepository;
import com.instagram.UserDto.UserDto;

@Service
public class StoryServiceImplementation implements StoryService {
	
	@Autowired
	private StoryRepository storyRepository;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public Story createStory(Story story, Integer userId) throws UserException {
		
		User user = userService.findUserById(userId);
		
		UserDto userDto = new UserDto();
		
		userDto.setEmail(user.getEmail());
		userDto.setId(user.getId());
		userDto.setName(user.getName());
		userDto.setUserImage(user.getImage());
		userDto.setUsername(user.getUsername());
		
		story.setUser(userDto);
		story.setTimestamp(LocalDateTime.now());
		
		user.getStories().add(story);
		userRepository.save(user);
		
		return storyRepository.save(story);
	}

	@Override
	public List<Story> findAllStoryByUserId(Integer userId) throws UserException, StoryException {
		
		User user = userService.findUserById(userId);
		
		List<Story> stories = user.getStories();
		
		if(stories.size() == 0) {
			throw new StoryException("Stories not found for user Id : "+userId);
		}
		
		return stories;
	}
	
	

}
