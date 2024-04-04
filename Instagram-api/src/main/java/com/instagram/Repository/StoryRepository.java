package com.instagram.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.instagram.Models.Story;

public interface StoryRepository extends JpaRepository<Story, Integer> {
	
	@Query("Select s from Story s where s.user.id= :userId")
	public List<Story> findAllStoryByUserId(@Param("userId") Integer userId);

}
