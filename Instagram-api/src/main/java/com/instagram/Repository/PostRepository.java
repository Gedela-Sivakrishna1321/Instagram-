package com.instagram.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.instagram.Models.Post;

public interface PostRepository extends JpaRepository<Post, Integer> {

	@Query(value = "SELECT * from posts  where user_id=?1", nativeQuery = true)
	public List<Post> findByUserId(Integer userId);
	
	@Query(value = "SELECT * from posts  WHERE user_id IN :users ORDER BY created_at DESC",nativeQuery = true)
	public List<Post> findAllPostByUserIds(@Param("users") List<Integer> userIds );
}
