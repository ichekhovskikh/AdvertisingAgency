package com.chekh.repository;

import com.chekh.entity.SellerEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SellerRepository extends CrudRepository<SellerEntity, Long> {
    @Query("FROM SellerEntity seller " +
            "WHERE UPPER(seller.passport.fullName) LIKE UPPER(concat('%', :fullName, '%'))")
    List<SellerEntity> search(@Param("fullName") String search, Sort sort);
}