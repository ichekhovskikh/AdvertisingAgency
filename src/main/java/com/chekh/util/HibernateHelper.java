package com.chekh.util;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import java.util.function.Consumer;

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

    public static void inTransaction(Session session, Consumer<Session> action) {
        try {
            session.beginTransaction();
            action.accept(session);
            session.getTransaction().commit();
        } catch (Exception e) {
            e.printStackTrace();
            session.getTransaction().rollback();
            throw e;
        }
    }
}
