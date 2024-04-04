package com.instagram.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.instagram.Models.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

}
