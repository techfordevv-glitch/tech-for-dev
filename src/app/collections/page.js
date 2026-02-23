"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FaFolderOpen, FaPlus, FaTrash, FaExternalLinkAlt, FaBookmark } from "react-icons/fa";
import { useUserData } from "@/components/UserDataProvider";
import { useBookmarks } from "@/components/BookmarkProvider";

export default function CollectionsPage() {
  const { collections, addCollection, removeCollection, addToCollection, removeFromCollection } = useUserData();
  const { bookmarks } = useBookmarks();
  const [name, setName] = useState("");

  const defaultCollectionId = useMemo(() => collections[0]?.id || "", [collections]);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1><FaFolderOpen className="me-2 text-primary" />Collections</h1>
          <p className="mb-0">Create custom reading collections and organize saved items.</p>
        </div>
      </div>

      <div className="container py-5">
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body d-flex flex-wrap gap-2 align-items-center">
            <input className="form-control" style={{ maxWidth: 320 }} value={name} onChange={(e) => setName(e.target.value)} placeholder="Collection name" />
            <button
              className="btn btn-primary d-inline-flex align-items-center gap-2"
              onClick={() => {
                addCollection(name);
                setName("");
              }}
            >
              <FaPlus /> Create
            </button>
          </div>
        </div>

        {bookmarks.length > 0 && collections.length > 0 && (
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h6 className="fw-bold mb-3"><FaBookmark className="me-2" />Quick Add from Bookmarks</h6>
              <div className="row g-2">
                {bookmarks.slice(0, 8).map((item) => (
                  <div key={`${item.type}-${item.id}`} className="col-md-6 col-lg-3">
                    <button
                      className="btn btn-outline-secondary btn-sm w-100 text-start"
                      onClick={() => addToCollection(defaultCollectionId, item)}
                      title="Add to first collection"
                    >
                      {item.title?.slice(0, 36)}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="row g-4">
          {collections.map((collection) => (
            <div className="col-lg-6" key={collection.id}>
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0">{collection.name}</h5>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => removeCollection(collection.id)}>
                      <FaTrash />
                    </button>
                  </div>
                  {collection.items.length > 0 ? (
                    <div className="d-flex flex-column gap-2">
                      {collection.items.map((item) => {
                        const itemKey = `${item.type}-${item.id || item.url || item.title}`;
                        return (
                          <div className="border rounded p-2 d-flex justify-content-between align-items-center" key={itemKey}>
                            <div>
                              <div className="fw-semibold small">{item.title}</div>
                              <small className="text-muted">{item.type}</small>
                            </div>
                            <div className="d-flex gap-2">
                              {item.url && (
                                <Link className="btn btn-sm btn-outline-primary" href={item.url}>
                                  <FaExternalLinkAlt size={10} />
                                </Link>
                              )}
                              <button className="btn btn-sm btn-outline-danger" onClick={() => removeFromCollection(collection.id, itemKey)}>
                                <FaTrash size={10} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-muted mb-0">No items yet.</p>
                  )}
                </div>
              </div>
            </div>
          ))}
          {collections.length === 0 && (
            <div className="col-12 text-center text-muted py-4">No collections created yet.</div>
          )}
        </div>
      </div>
    </>
  );
}
