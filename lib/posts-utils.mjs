// cachePosts.js in the utils folder
import fs from "fs";
import path from "path";
import matter from "gray-matter";
// import { notFound } from "next/navigation";
import { notFound } from "next/navigation.js";
import { startOfDay, endOfDay } from "date-fns";

////////////////////
// Generate the cache
export function generatePostsCache() {
  const postsDirectory = path.join(process.cwd(), "data/posts");
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter(
      (fileName) => !fileName.startsWith(".") && fileName.endsWith(".mdx")
    );

  const currentDate = startOfDay(new Date()); // Get the start of the current day

  const posts = fileNames
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data: frontMatter } = matter(fileContents);

      const postDate = startOfDay(new Date(frontMatter.date)); // Get the start of the post's date

      // Skip future-dated posts and include posts for the current day
      if (postDate > currentDate) {
        return null;
      }

      return {
        slug: fileName.replace(".mdx", ""),
        ...frontMatter,
      };
    })
    .filter(Boolean); // Filter out null values representing future-dated posts

  const cachePath = path.join(process.cwd(), "cache/posts.json");
  fs.writeFileSync(cachePath, JSON.stringify(posts, null, 2));

  return posts;
}

////////////////////
// Get filtered posts
export function getPosts(
  type = "",
  limit,
  page,
  searchTerm,
  sort = "date_asc"
) {
  const cacheFilePath = path.join(process.cwd(), "cache/posts.json");
  const jsonData = fs.readFileSync(cacheFilePath, "utf8");
  let posts = JSON.parse(jsonData).filter((blog) => !blog.slug.startsWith("."));

  posts = posts.filter(
    (post) => !post.slug.startsWith(".") && post.type.includes(type)
  );

  // Search filter
  if (searchTerm && searchTerm.trim() !== "") {
    posts = posts.filter((post) => {
      return (
        (post.title &&
          post.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (post.description &&
          post.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (post.author &&
          post.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (Array.isArray(post.tags) &&
          post.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )) ||
        (Array.isArray(post.categories) &&
          post.categories.some((cat) =>
            cat.toLowerCase().includes(searchTerm.toLowerCase())
          ))
      );
    });
  }

  const totalPosts = posts.length;

  // sort by date
  const [sortBy, sortOrder] = sort.split("_");

  posts.sort((a, b) => {
    if (sortBy === "date") {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    } else if (sortBy === "title") {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    }
  });

  posts.forEach((post) => {
    const date = new Date(post.date);
    post.formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  // Pagination
  const start = (page - 1) * limit;
  if (limit) {
    posts = posts.slice(start, start + limit);
  }

  return { posts, totalPosts };
}

export async function getPost({ slug }) {
  try {
    const markdownFile = fs.readFileSync(
      path.join("data/posts", slug + ".mdx"),
      "utf-8"
    );
    const { data: frontMatter, content } = matter(markdownFile);

    return {
      frontMatter,
      slug,
      content,
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return notFound();
  }
}

// Get all posts
export function getAllPosts() {
  const postsDirectory = path.join(process.cwd(), "data/posts");
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter(
      (fileName) => !fileName.startsWith(".") && fileName.endsWith(".mdx")
    );

  const posts = fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data: frontMatter } = matter(fileContents);

    return {
      slug: fileName.replace(".mdx", ""),
      ...frontMatter,
    };
  });

  return posts;
}
