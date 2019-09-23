package com.chekh.repository;

import com.chekh.entity.PassportEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PassportRepository extends CrudRepository<PassportEntity, Long> {
    @Query("FROM PassportEntity passport where UPPER(passport.fullName) LIKE UPPER(concat('%', :fullName, '%'))")
    List<PassportEntity> search(@Param("fullName") String search, Sort sort);
}