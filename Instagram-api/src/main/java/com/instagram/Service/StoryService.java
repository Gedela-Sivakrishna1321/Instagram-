package com.instagram.Service;

import java.util.List;

import com.instagram.Exceptions.StoryException;
import com.instagram.Exceptions.UserException;
import com.instagram.Models.Story;

public interface StoryService {
	
	public Story createStory(Story story, Integer userId ) throws UserException;
	
	public List<Story> findAllStoryByUserId( Integer userId ) throws UserException, StoryException; 

}
