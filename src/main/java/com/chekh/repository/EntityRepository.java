package com.chekh.repository;

import java.util.List;

public interface EntityRepository<T> extends AutoCloseable {
    List<T> getAll();
    T get(long id);
    void add(T entity);
    void remove(long id);
    void remove(T entity);
    void update(T entity);
    void rollback();
}
