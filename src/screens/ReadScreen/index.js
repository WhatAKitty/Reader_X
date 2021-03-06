import React, { Component, PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  ActionSheetIOS,
  AsyncStorage,
  LayoutAnimation,
  TouchableWithoutFeedback,
  InteractionManager,
  Alert,
} from 'react-native';

import { Icon, Button } from 'react-native-elements';
import { HeaderBackButton } from 'react-navigation';
// import { Thread } from 'react-native-threads';
import { Pages as ReadPager } from '../../components/ReactNativePages';
import { iOSUIKitTall, iOSColors } from 'react-native-typography'

import BottomNav from './BottomNav';
import Page from '../../components/Page';
import EmptyView from '../../components/EmptyView';

import task from '../../headlessTasks/ChapterCacheTask';
import { content, chapterList } from '../../services/book';
import getRealm, { SortDescriptor } from '../../models';
import constants from '../../utils/constants';

import styles from './index.style';
import { theme } from '../../theme';
import { getTheme, moonTheme, defaultTheme } from './ReaderTheme.style';
import { Promise } from 'core-js';

const { STATUS } = constants;

// const cachedThread = new Thread('./src/headlessTasks/ChapterCacheTask.js');
class ReadScreen extends PureComponent {
  static navigationOptions = ({ navigation, screenProps }) => {
    let barShow = navigation.state.params.barShow ? {} : { header: null };
    return {
      ...barShow,
      title: '',
      headerStyle: styles.header.self,
      headerLeft: (
        <HeaderBackButton
          title='返回'
          tintColor={'#fff'}
          onPress={() => {
            navigation.goBack(null);
          }}
        />
      ),
      headerRight: (
        <View style={theme.styles.navRightContainer}>
          <Icon
            containerStyle={theme.styles.navButtonContainer}
            name='arrow-downward'
            type='MaterialIcons'
            color={theme.styles.navButton.color}
            underlayColor={theme.styles.navButton.underlayColor}
            onPress={() => {
              // 后台线程缓存所有
              Alert.alert(
                '提示',
                '是否缓存全部',
                [
                  {
                    text: '缓存全部', onPress: () => {
                      // cachedThread.postMessage(JSON.stringify({
                      //   bookId: navigation.state.params.book._id,
                      // }));
                      InteractionManager.runAfterInteractions(() => {
                        task.task({ bookId: navigation.state.params.book._id })
                      })

                    }
                  },
                  { text: '取消', style: 'cancle' },
                ],
                { cancelable: true }
              )

            }}
          />
          <Icon
            containerStyle={theme.styles.navButtonContainer}
            name='bubble-chart'
            type='MaterialIcons'
            color={theme.styles.navButton.color}
            underlayColor={theme.styles.navButton.underlayColor}
            onPress={() => { }}
          />
          <Icon
            containerStyle={theme.styles.navButtonContainer}
            name='more-horiz'//bubble-chart
            type='MaterialIcons'
            color={theme.styles.navButton.color}
            underlayColor={theme.styles.navButton.underlayColor}
            onPress={() => { }}
          />
        </View>
      ),
      tabBarVisible: false,
    };
  }

  state = {
    status: STATUS.READY,
    chapters: [],
    chapterTitle: '加载中',
    progress: 0,
    barShow: false,
    theme: null,
  };

  constructor(props) {
    super(props);

    this.currentChapter = 0;
    this.allPageIndex = 0;

    /**
     * {
     *   51: {
     *     pages: [],
     *     progress: 0,
     *   },
     * }
     */
    this.cachedChapters = {};
  }

  componentDidMount() {
    this._init();
    this._themeInit();

    // cachedThread.onmessage = (message) => {
    //   const data = JSON.parse(message);
    //   const { progress, finished, error } = data;

    //   if (error) {
    //     alert('缓存失败，请重试');
    //   } else if (finished) {
    //     alert('缓存完成');
    //   } else {
    //     alert(`进行中  ${progress}`);
    //   }
    // }
  }

  renderNone() {
    return (
      <EmptyView
        tip="访问失败"
        subTip="重新加载"
      />
    );
  }

  renderLoading() {
    return (
      <EmptyView
        tip="正在加载中"
      />
    );
  }

  renderChapterPage(chapterIndex, pageLines = [], pageIndex) {
    const { theme } = this.state;
    return (
      <TouchableWithoutFeedback key={`${chapterIndex}-${pageIndex}`} onPress={this._toggleBar}>
        <View
          style={[{
            flex: 1,
            overflow: 'hidden',
            backgroundColor: 'transparent',
          }]}
        >
          <Text>
            {
              pageLines.map((pageLine, lineIndex) => (
                <Text
                  key={`${pageIndex}-${lineIndex}`}
                  numberOfLines={1}
                  style={[getTheme(this.state.theme).text, this.chapterStyles]}
                >{pageLine}{"\n"}</Text>
              ))
            }
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderContent() {
    if (STATUS.READY === this.state.status || STATUS.LOADING === this.state.status) {
      return this.renderLoading();
    }
    if (STATUS.FINISH !== this.state.status) {
      return this.renderNone();
    }
    return (
      <ReadPager
        ref="pages"
        style={{
          paddingTop: 0,
          paddingRight: 10,
          paddingBottom: 40,
          paddingLeft: 20,
        }}
        indicatorPosition="none"
        onScrollEnd={this._onPageChanged}
      >
        {
          Object.keys(this.cachedChapters)
            .reduce(
              (lines, chapterIndex) => {
                return [...lines, ...this.cachedChapters[chapterIndex].pages.map(
                  (pageLines, index) => this.renderChapterPage(chapterIndex, pageLines, index)
                )];
              }, []
            )
        }
      </ReadPager>
    )
  }

  renderPageInfo() {
    if (STATUS.FINISH !== this.state.status) {
      return false;
    }

    const cachedChapter = this.cachedChapters[this.currentChapter];
    if (!cachedChapter) {
      return false;
    }

    const precent = (+cachedChapter.progress).toFixed(1);
    return (
      <Fragment>
        <Text style={styles.footer.text}>{1}/{cachedChapter.pages.length} {precent}%</Text>
        <Text style={[styles.footer.text, styles.footer.right]}>20:18</Text>
      </Fragment>
    );
  }

  renderBottomNav() {
    if (!this.state.barShow) {
      return false;
    }

    return (
      <BottomNav
        screenProps={this.props.screenProps}
        navigation={this.props.navigation}
        onChangeBackGround={this._onChangeBackgroundColor}
        onChangeMode={() => this._onChangeBackgroundColor(this.state.theme === moonTheme ? defaultTheme : moonTheme)}
        onCatalogIn={this._onCatalogIn}
      />
    );
  }

  render() {
    const theme = getTheme(this.state.theme);
    return (
      <Page
        containerStyle={theme.background}
      >
        <StatusBar
          barStyle={'light-content'}
          hidden={!this.state.barShow}
          animation={true}
        />
        <View style={styles.title.wrapper} >
          <Text style={styles.title.text} >{this.state.chapterTitle}</Text>
        </View>
        {this.renderContent()}
        <View style={styles.footer.wrapper}>
          {this.renderPageInfo()}
        </View>
        {this.renderBottomNav()}
      </Page>
    );
  }

  /**
   * 初始化主题
   */
  _themeInit = async () => {
    const { realm, err } = await getRealm();
    const realmConfig = realm.objectForPrimaryKey('Config', 'theme');
    if (realmConfig) {
      this.setState({
        theme: realmConfig.value,
      });
    }
  }

  /**
   * 初始化章节内容
   * 
   * @see this._recordChapterChange(chapterIndex, chapters)
   * @see this._shouldPapareChapter(direction, chapters)
   * @see this._papareChapter(chapters, chapterIndex)
   * 
   * @issue 如果在最后一页“没有了，去看看别的”页面退出阅读界面，再进入仍旧是该页面，需要优化
   */
  _init = async () => {
    const book = this.props.navigation.state.params.book;
    const { data: chapters, err } = await chapterList(book._id);
    if (err || chapters.length === 0) {
      this.setState({
        status: STATUS.FAILED,
      });
      return false;
    }

    // fetch realm book info
    const realmBook = await this._getRealmBook();
    const prevChapterIndex = this.currentChapter = realmBook.lastReadedChapter;
    this.allPageIndex = realmBook.lastChapterReadPage;

    if ('undefined' === typeof this.currentChapter || this.currentChapter === null) {
      // if current chapter index is null
      this.currentChapter = 0;
    } else if (this.currentChapter > (chapters.length - 1)) {
      // if current chapter index lager than last chapter index, 
      // reset current chapter index and set into realm database.
      this.currentChapter = chapters.length - 1;
    }

    // init cachedChapters
    await this._papareChapter(chapters, this.currentChapter);
    const cachedChapter = this.cachedChapters[this.currentChapter];
    if (this._shouldPapareChapter(-1, chapters)) {
      await this._papareChapter(chapters, this.currentChapter - 1);
      this.allPageIndex = this._getPageSize(this.currentChapter, -1, false) + realmBook.lastChapterReadPage;
    }
    if (this._shouldPapareChapter(1, chapters)) {
      await this._papareChapter(chapters, this.currentChapter + 1);
    }

    // record chapter change
    if (prevChapterIndex !== this.currentChapter) {
      // 发生变化
      this._recordChapterChange(this.currentChapter, realmBook.progress, chapters);
    }

    // init some data
    this.setState({
      chapters,
      progress: realmBook.progress,
      status: STATUS.FINISH,
      chapterTitle: cachedChapter.title,
    }, () => this._resetPagesProgress(this.allPageIndex));
  }

  /**
   * 当页面发生改变
   * 
   * @see this._papareChapter(chapters, chapterIndex)
   * @see this._recordPageProgress()
   * @see this._onChapterChange(pre, next)
   */
  _onPageChanged = async () => {
    const oldAllPageIndex = this.allPageIndex;
    this.allPageIndex = this.refs.pages.progress;

    const cachedChapter = this.cachedChapters[this.currentChapter];
    if (oldAllPageIndex === this.allPageIndex) {
      // 位置未发生变化，不触发页面变更事件
      return;
    } else if (oldAllPageIndex < this.allPageIndex) {
      // 下一页
      if (this._shouldPapareChapter(1)) {
        await this._papareChapter(this.state.chapters, this.currentChapter + 1);
      }
    } else if (oldAllPageIndex > this.allPageIndex) {
      // 上一页
      if (this._shouldPapareChapter(-1)) {
        await this._papareChapter(this.state.chapters, this.currentChapter - 1);
      }
    }

    // 处理章节切换逻辑
    const chapterPageSize = this._getPageSize(this.currentChapter, -1, true);
    const chapterPageSizeWithoutCurrent = this._getPageSize(this.currentChapter, -1, false);
    if ((this.currentChapter + 1) <= (this.state.chapters.length - 1)
      && (this.allPageIndex + 1) > chapterPageSize) {
      this._onChapterChange(this.currentChapter, this.currentChapter + 1);
    } else if ((this.currentChapter - 1) >= 0
      && (this.allPageIndex + 1) <= chapterPageSizeWithoutCurrent) {
      this._onChapterChange(this.currentChapter, this.currentChapter - 1);
    }

    if (this.currentChapter >= 0 && this.currentChapter <= (this.state.chapters.length - 1)) {
      // record chapter page change
      this._recordPageProgress();
    }

  }

  /**
   * 章节切换逻辑
   * 
   * @see this._recordChapterChange(currentChapterIndex, progress, chapters)
   */
  _onChapterChange = async (pre, next) => {
    this._recordChapterChange(this.currentChapter = next, null, this.state.chapters);
    // 更改标题
    requestAnimationFrame(() => this.setState({
      chapterTitle: this.cachedChapters[this.currentChapter].title,
    }));
  }

  /**
   * 是否应该准备前一章或下一章的内容
   * 
   * @param direction 翻页方向
   */
  _shouldPapareChapter = (direction, chapters = this.state.chapters) => {
    if ((this.currentChapter - 1) < 0 || (this.currentChapter + 1) > (chapters.length - 1)) {
      // 前一章为第一章或后一章为最后一章不加载
      return false;
    }
    // 在这章的最后两页，自动加载下一章内容
    if (direction > 0 && (this.allPageIndex + 1) >= (this._getAllPageSize() - 20)) {
      return true;
    } else if (direction < 0 && this.allPageIndex < 2) {
      return true;
    }

    return false;
  }

  /**
   * 准备下一章内容
   * 
   * @see this._fetchChapterContent(chapters, chapterIndex, chapterLink)
   */
  _papareChapter = async (chapters, chapterIndex) => {
    if (this.paparing) {
      return;
    }
    this.paparing = true;

    const oldCachedChapters = this.cachedChapters[chapterIndex];
    if (oldCachedChapters && !oldCachedChapters.loading) {
      // 已经缓存过
      this.paparing = false;
      return false;
    }

    await this._fetchChapterContent(chapters, chapterIndex, chapters[chapterIndex].link);
    this.paparing = false;
  }

  /**
   * 获取章节内容
   * 
   * @see this._processContent(body)
   */
  _fetchChapterContent = async (chapters, chapterIndex, link) => {
    // 存在章节缓存，直接返回缓存内容
    const { realm, err } = await getRealm();
    const realmChapter = realm.objectForPrimaryKey('Chapter', link);

    const { data: chapter, err: chapterErr } = realmChapter ?
      {
        data: {
          body: realmChapter.content,
          title: realmChapter.title,
        }
      } : await content(link);

    if (chapterErr) {
      this.setState({
        status: STATUS.FAILED,
      });
      return false;
    }

    const { body } = chapter;
    const { chapterPages: pages, styles } = await this._processContent(body);
    const oldCachedChapter = this.cachedChapters[chapterIndex];
    const needUpdated = 'undefined' === typeof oldCachedChapter || oldCachedChapter.loading;
    const title = chapters[chapterIndex].title;
    this.cachedChapters[chapterIndex] = {
      pages,
      styles,
      progress: 0,
      size: pages.length,
      title,
      raw: body,
    };
    InteractionManager.runAfterInteractions(() => this._cacheChapter({
      index: chapterIndex,
      content: body,
      title,
      link,
    }));
    needUpdated && InteractionManager.runAfterInteractions(() => this.forceUpdate());

    // 加载中效果页面，防止网络请求过慢导致的卡顿问题
    if (this.currentChapter >= (chapters.length - 1)) {
      this.cachedChapters[chapterIndex + 1] = {
        pages: [['没有了，去看看别的吧']],
        loading: true,
        styles,
        progress: 0,
        size: 1,
        title: '',
        raw: undefined,
      };
    } else if (!this.cachedChapters[chapterIndex + 1]) {
      this.cachedChapters[chapterIndex + 1] = {
        pages: [['加载中']],
        loading: true,
        styles,
        progress: 0,
        size: 1,
        title: '加载中',
        raw: undefined,
      };
    }
  }

  /**
   * 重置页面进度
   */
  _resetPagesProgress = (resetPageIndex, callback) => {
    if (this.refs.pages) {
      this.refs.pages.resetProgress(resetPageIndex, () => {
        InteractionManager.runAfterInteractions(() => {
          this.forceUpdate(callback);
        });
      });
    }
  }

  /**
   * 解析文本内容
   * 
   * @see this._processLine(line, maxLineWords)
   */
  _processContent = async (text) => {
    const { width: w, height: h } = Dimensions.get('window');
    const theme = getTheme(this.state.theme).text;
    const { fontSize, lineHeight } = theme;

    const words = Math.floor((w - 40) / fontSize);
    const lines = Math.floor((h - 80) / lineHeight);   // 总行数

    const rawLines = text.match(/[^\r\n]+/g);
    // 额外加两个全角空格，调整排版样式
    const processedLines = rawLines.reduce((res, rawLine) => res.concat(this._processLine(`\u3000\u3000${rawLine.trim()}`, words)), []);
    const pagesize = Math.ceil(processedLines.length / lines);

    let chapterPages = [];
    for (var i = 0; i < pagesize; i++) {
      const startIndex = i * lines;
      const endIndex = startIndex + lines;
      const chapterLines = processedLines.slice(startIndex, endIndex);

      chapterPages = [...chapterPages, chapterLines];
    }

    return {
      chapterPages,
      styles: {
        fontSize,
        lineHeight,
        textAlign: 'justify',
        width: words * fontSize,
      },
    };
  }

  /**
   * 解析行内容
   */
  _processLine = (line, maxLineWords) => {
    const needNewLine = line.length > maxLineWords;
    const newLines = [];
    if (needNewLine) {
      const newLineSize = Math.ceil(line.length / maxLineWords);
      for (var i = 0; i < newLineSize; i++) {
        if (line.trim() === '') {
          break;
        }
        newLines.push(line.substring(0, maxLineWords));
        line = line.substring(maxLineWords);
      }
    } else {
      newLines.push(line);
    }

    return newLines;
  }

  /**
   * 跳转到某个章节
   * 
   * 注意：跳转后，缓存清空，重新初始化
   */
  _jumpToChapter = async (chapterIndex) => {
    const preChapterIndex = this.currentChapter;
    const chapters = this.state.chapters;
    if (chapterIndex < 0 || chapterIndex > (chapters.length - 1)) {
      alert('不存在该章节');
      return false;
    }

    this.setState({
      status: STATUS.LOADING,
    }, async () => {
      // reset cached chapters and some page index
      this.cachedChapters = {};
      this.currentChapter = chapterIndex;
      this.allPageIndex = 0;

      // init cachedChapters
      await this._papareChapter(chapters, this.currentChapter);
      const cachedChapter = this.cachedChapters[this.currentChapter];
      if (this._shouldPapareChapter(-1)) {
        await this._papareChapter(chapters, this.currentChapter - 1);
        this.allPageIndex = this._getPageSize(this.currentChapter, -1, false);
      }
      if (this._shouldPapareChapter(1)) {
        await this._papareChapter(chapters, this.currentChapter + 1);
      }

      // init some data
      this.setState({
        status: STATUS.FINISH,
      }, () => {
        this._resetPagesProgress(this.allPageIndex);
        this._onChapterChange(preChapterIndex, chapterIndex);
      });
    });
  }

  /**
   * 切换显示工具栏
   */
  _toggleBar = () => {
    const barShow = !this.state.barShow;
    this.setState({
      barShow,
    });
    this.props.navigation.setParams({
      barShow,
    });
  }

  /**
   * 当阅读背景改变主题的时候
   */
  _onChangeBackgroundColor = key => {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        theme: key,
      }, async () => {
        // 将主题写入数据库
        const { realm, err } = await getRealm();
        realm.write(() => {
          realm.create('Config', {
            key: 'theme',
            value: key,
          }, true);
        });
      });
    });
  }

  /**
   * 当点击章节列表的时候
   */
  _onCatalogIn = () => {
    this.props.navigation.navigate('Catalog', {
      chapterList: this.state.chapters,
      chapterIndex: this.currentChapter,
      bookName: this.props.navigation.state.params.book.title,

      onChapterClicked: (index, chapter) => {
        this._jumpToChapter(index);
        this._toggleBar();
      },
    });
  }

  /**
   * 获取缓存的书本内容
   */
  _getRealmBook = async () => {
    const { realm, err } = await getRealm();
    const book = this.props.navigation.state.params.book;
    if (this.realmBook
      || (this.realmBook = realm.objectForPrimaryKey('Book', book._id))) {
      return this.realmBook;
    }

    realm.write(() => {
      realm.create('Book', book);
    });
    return (this.realmBook = realm.objectForPrimaryKey('Book', book._id));
  }

  /**
   * 记录章节变更
   */
  _recordChapterChange = async (currentChapterIndex, progress, chapters = this.state.chapters) => {
    const { realm, err } = await getRealm();
    const chapter = chapters[currentChapterIndex];
    const cachedChapter = this.cachedChapters[currentChapterIndex];
    const book = await this._getRealmBook();
    InteractionManager.runAfterInteractions(() => {
      realm.write(() => {
        // 修改图书信息
        book.lastReadedTime = new Date().getTime();
        book.lastReadedChapter = currentChapterIndex;
        book.lastReadedChapterName = chapter.title;
        ('undefined' !== typeof progress) && progress !== null && (book.progress = +progress);
      });

      // 增加该章节缓存
      this._cacheChapter({
        index: this.currentChapterIndex,
        content: cachedChapter.raw,
        title: chapter.title,
        link: chapter.link,
      });
    });
  }

  /**
   * 缓存某个章节
   * 注意：需要外部使用realm.write包裹
   * 
   * @param chapter 需要缓存的章节
   */
  _cacheChapter = async ({ index, content, title, link }) => {
    const { realm, err } = await getRealm();
    const realmChapter = realm.objectForPrimaryKey('Chapter', link);
    // 增加该章节缓存
    if (!realmChapter) {
      const book = this.props.navigation.getParam('book', {});
      realm.write(() => {
        realm.create('Chapter', {
          bookId: book._id,
          title,
          link,
          index,
          content,
        });
      });
    }
  }

  /**
   * 记录章节进度
   */
  _recordPageProgress = async () => {
    if (this.pageProgressRecording) {
      return;
    }
    this.pageProgressRecording = true;

    const { realm, err } = await getRealm();
    const book = await this._getRealmBook();
    InteractionManager.runAfterInteractions(() => {
      realm.write(() => {
        book.lastChapterReadPage = this.allPageIndex - this._getPageSize(this.currentChapter, -1, false);
      });
      this.pageProgressRecording = false;
    });
  }

  /**
   * 获取chapterIndex之前或者之后的章节数
   * 
   * @param chapterIndex 需要定位的章节索引
   * @param direction 查询的方向
   * @param include 是否包含定位章节本身的数量
   */
  _getPageSize = (chapterIndex, direction, include = false) => {
    if (this.preGetPageSize && this.preGetPageSize.key === `${this.cachedChapters.length}-${chapterIndex}-${direction}-${include}`) {
      return this.preGetPageSize.value;
    }
    const start = direction > 0 ? (indclude ? chapterIndex : (chapterIndex + 1)) : 0;
    const end = direction > 0 ? (this.cachedChapters.length - 1) : (include ? chapterIndex : (chapterIndex - 1));
    const pageSize = Object.keys(this.cachedChapters)
      .filter(key => key >= start && key <= end)
      .map(key => this.cachedChapters[key])
      .reduce((count, sub) => count + sub.size, 0);
    this.preGetPageSize = {
      key: `${this.cachedChapters.length}-${chapterIndex}-${direction}-${include}`,
      value: pageSize,
    };
    return pageSize;
  }

  /**
   * 获取所有的页面数
   */
  _getAllPageSize = () => {
    if (this.preGetAllPageSize && this.preGetAllPageSize.key === this.cachedChapters.length) {
      return this.preGetAllPageSize.value;
    }
    const pageSize = Object.keys(this.cachedChapters)
      .map(key => this.cachedChapters[key])
      .reduce((count, sub) => count + sub.size, 0);

    this.preGetAllPageSize = {
      key: this.cachedChapters.length,
      value: pageSize,
    };
    return pageSize;
  }
}

export default ReadScreen;
