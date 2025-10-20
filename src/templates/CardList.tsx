import { Card } from '@/components/Card';

export type CardData = {
  id: string | number;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  link?: string;
  category?: string;
  date?: string;
};

type CardListProps = {
  cards: CardData[];
  layout?: 'horizontal' | 'vertical';
  title?: string;
  description?: string;
};

/**
 * CardList Component
 * Displays a list of multiple cards with customizable layout
 */
export const CardList = ({
  cards,
  layout = 'vertical',
  title,
  description,
}: CardListProps) => {
  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        {(title || description) && (
          <div className="mb-8 text-center">
            {title && (
              <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Card Grid/List Container */}
        {layout === 'horizontal'
          ? (
              // Horizontal Layout (Grid-List)
              <div className="relative">
                <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 dark:scrollbar-track-gray-800 dark:scrollbar-thumb-gray-600">
                  {cards.map(card => (
                    <div
                      key={card.id}
                      className="min-w-[300px] max-w-[350px] flex-shrink-0 sm:min-w-[350px]"
                    >
                      <Card
                        title={card.title}
                        description={card.description}
                        image={card.image}
                        imageAlt={card.imageAlt}
                        link={card.link}
                        category={card.category}
                        date={card.date}
                      />
                    </div>
                  ))}
                </div>

                {/* Scroll Indicator */}
                {cards.length > 3 && (
                  <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    <span className="inline-flex items-center gap-2">
                      Scroll to see more
                      <svg
                        className="h-4 w-4 animate-bounce"
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
                    </span>
                  </div>
                )}
              </div>
            )
          : (
              // Vertical Layout (Grid Normal)
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cards.map(card => (
                  <div key={card.id}>
                    <Card
                      title={card.title}
                      description={card.description}
                      image={card.image}
                      imageAlt={card.imageAlt}
                      link={card.link}
                      category={card.category}
                      date={card.date}
                    />
                  </div>
                ))}
              </div>
            )}

        {/* Empty State */}
        {cards.length === 0 && (
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center dark:border-gray-700">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              No cards available
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              There are no card data to display.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
