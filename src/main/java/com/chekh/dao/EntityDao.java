package com.chekh.dao;

import java.util.List;

public interface EntityDao<T> {
    List<T> getAll();
    T get(long id);
    void add(T entity);
    void remove(long id);
    void remove(T entity);
    void update(T entity);
    void rollback();
    void close();
}
