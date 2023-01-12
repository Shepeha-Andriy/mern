import React, { useCallback, useContext, useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { LinksList } from "../components/LinksList";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";

export const LinksPage = () => {
  const [links, setLinks] = useState([])
  const {loading, request} = useHttp()
  const { token } = useContext(AuthContext)

  const fetchLinks = useCallback(async() => {
    try {
      
      const fetched = await request('/api/link', 'GET', null, {Authorization: `Bearer ${token}`})
      setLinks(fetched)

    } catch (e) {
      
    }
  }, [token, request])

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  if (loading) {
    return <Loader></Loader>
  }

  return (
    <>
      {!loading && <LinksList links={links}></LinksList>}
    </>
  )
}