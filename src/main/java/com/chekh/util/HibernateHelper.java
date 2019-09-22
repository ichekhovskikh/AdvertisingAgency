package com.chekh.util;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;

public class HibernateHelper {
    private static SessionFactory sessionFactory = null;

    private HibernateHelper() {
    }

    public static SessionFactory getSessionFactory() {
        createSessionFactoryIfNeed();
        return sessionFactory;
    }

    private static void createSessionFactoryIfNeed() {
        if (sessionFactory == null) {
            sessionFactory = new Configuration().configure().buildSessionFactory();
        }
    }

    public static void inTransaction(Consumer<Session> action) {
        Session session = getSessionFactory().openSession();
        try {
            session.beginTransaction();
            action.accept(session);
            session.getTransaction().commit();
            session.close();
        } catch (Exception e) {
            e.printStackTrace();
            session.getTransaction().rollback();
            session.close();
            throw e;
        }
    }

    public static <T> T inTransaction(Function<Session, T> action) {
        Session session = getSessionFactory().openSession();
        try {
            session.beginTransaction();
            T result = action.apply(session);
            session.getTransaction().commit();
            session.close();
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            session.getTransaction().rollback();
            session.close();
            throw e;
        }
    }
}
