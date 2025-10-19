import Image from 'next/image';

type CardProps = {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  link?: string;
  category?: string;
  date?: string;
};

/**
 * Card Component
 * Used to display a single card with information such as title, description, image, etc.
 */
export const Card = ({
  title,
  description,
  image,
  imageAlt = 'Card image',
  link,
  category,
  date,
}: CardProps) => {
  const CardContent = (
    <div className="group h-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
      {/* Image Section */}
      {image && (
        <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Content Section */}
      <div className="p-6">
        {/* Category & Date */}
        {(category || date) && (
          <div className="mb-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            {category && (
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {category}
              </span>
            )}
            {date && <span>{date}</span>}
          </div>
        )}

        {/* Title */}
        <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300">{description}</p>

        {/* Link Indicator */}
        {link && (
          <div className="mt-4 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
            Read more
            <svg
              className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );

  // If link exists, wrap with anchor tag
  if (link) {
    return (
      <a
        href={link}
        className="block h-full transition-transform duration-200 hover:-translate-y-1"
        target="_blank"
        rel="noopener noreferrer"
      >
        {CardContent}
      </a>
    );
  }

  return <div className="h-full">{CardContent}</div>;
};
