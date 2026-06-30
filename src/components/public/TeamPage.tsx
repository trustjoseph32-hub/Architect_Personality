import React from 'react';
import { useRouter } from '../../lib/use-router.js';
import { TeamMember } from '../../types.js';
import Container from '../ui/Container.js';
import SectionTitle from '../ui/SectionTitle.js';
import Card from '../ui/Card.js';
import Button from '../ui/Button.js';
import { Send, ArrowUpRight } from 'lucide-react';

interface TeamPageProps {
  team: TeamMember[];
}

export const TeamPage: React.FC<TeamPageProps> = ({ team }) => {
  const { navigate } = useRouter();

  return (
    <div className="py-16 sm:py-24 bg-[#FAF8F5]">
      <Container>
        <SectionTitle
          eyebrow="КОМАНДА ЭКСПЕРТОВ"
          title="Специалисты Проекта"
          subtitle="Мы собрали лучших экспертов на стыке практической психотерапии, коучинга и концептуальной стилистики, готовых бережно провести вас по пути личностных изменений."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 mt-12">
          {team.map((member) => {
            let socialLinks: any = {};
            try {
              if (member.social_links_json) {
                socialLinks = JSON.parse(member.social_links_json);
              }
            } catch (e) {
              console.error(e);
            }

            return (
              <Card key={member.id} className="bg-white flex flex-col md:flex-row border border-stone-200">
                {/* Photo portion */}
                <div className="w-full md:w-2/5 h-80 md:h-auto overflow-hidden relative bg-stone-100">
                  <img
                    src={member.photo_url || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800'}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale-[15%]"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Info portion */}
                <div className="w-full md:w-3/5 p-8 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-heading text-xl sm:text-2xl font-semibold text-slate-900 leading-tight">
                        {member.name}
                      </h3>
                      <span className="font-mono text-[10px] tracking-widest text-amber-800 uppercase font-bold block">
                        {member.role}
                      </span>
                    </div>

                    <p className="text-sm font-medium text-stone-600 leading-relaxed">
                      {member.short_description}
                    </p>

                    <p className="text-xs text-stone-400 font-light leading-relaxed">
                      {member.full_description}
                    </p>
                  </div>

                  {/* Social media connections */}
                  <div className="pt-6 border-t border-stone-50 mt-6 flex items-center justify-between">
                    {socialLinks.telegram ? (
                      <a
                        href={socialLinks.telegram}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center text-xs text-stone-500 hover:text-amber-800 font-mono tracking-wider transition-colors"
                      >
                        <Send className="w-3.5 h-3.5 mr-1.5 text-amber-800" /> Написать в Telegram
                      </a>
                    ) : (
                      <span className="text-[10px] text-stone-400 font-mono">доступна запись</span>
                    )}

                    <button
                      onClick={() => navigate('/#lead-form')}
                      className="text-stone-400 hover:text-amber-800 transition-colors cursor-pointer"
                      title="Записаться к эксперту"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </div>
  );
};
export default TeamPage;
